package eu.epitech.andyet.web.rest;

import com.codahale.metrics.annotation.Timed;
import eu.epitech.andyet.domain.Delivery;
import eu.epitech.andyet.repository.DeliveryRepository;
import eu.epitech.andyet.service.MailService;
import eu.epitech.andyet.web.rest.util.HeaderUtil;
import eu.epitech.andyet.web.rest.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Delivery.
 */
@RestController
@RequestMapping("/api")
public class DeliveryResource {

    private final Logger log = LoggerFactory.getLogger(DeliveryResource.class);

    @Inject
    private DeliveryRepository deliveryRepository;

    @Inject
    private MailService mailService;

    /**
     * POST  /deliverys -> Create a new delivery.
     */
    @RequestMapping(value = "/deliverys",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Delivery> createDelivery(@RequestBody Delivery delivery) throws URISyntaxException {
        log.debug("REST request to save Delivery : {}", delivery);
        if (delivery.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("delivery", "idexists", "A new delivery cannot already have an ID")).body(null);
        }
        Delivery result = deliveryRepository.save(delivery);
        return ResponseEntity.created(new URI("/api/deliverys/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("delivery", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /deliverys -> Updates an existing delivery.
     */
    @RequestMapping(value = "/deliverys",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Delivery> updateDelivery(@RequestBody Delivery delivery) throws URISyntaxException {
        log.debug("REST request to update Delivery : {}", delivery);
        if (delivery.getId() == null) {
            return createDelivery(delivery);
        }
        Delivery result = deliveryRepository.save(delivery);

        if (result.getStatus().getId() == 5) {
            mailService.sendEmail(result.getUser().getEmail(), "Confirmation de commande", "N°commande: " + result.getId(), false, false);
        }
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("delivery", delivery.getId().toString()))
            .body(result);
    }

    /**
     * GET  /deliverys -> get all the deliverys.
     */
    @RequestMapping(value = "/deliverys",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<Delivery>> getAllDeliverys(Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get a page of Deliverys");
        Page<Delivery> page = deliveryRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/deliverys");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /deliverys/:id -> get the "id" delivery.
     */
    @RequestMapping(value = "/deliverys/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Delivery> getDelivery(@PathVariable Long id) {
        log.debug("REST request to get Delivery : {}", id);
        Delivery delivery = deliveryRepository.findOne(id);
        return Optional.ofNullable(delivery)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /deliverys/:id -> delete the "id" delivery.
     */
    @RequestMapping(value = "/deliverys/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteDelivery(@PathVariable Long id) {
        log.debug("REST request to delete Delivery : {}", id);
        deliveryRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("delivery", id.toString())).build();
    }

    /**
     * GET  /myDeliveries -> get all my deliveries.
     */
    @RequestMapping(value = "/myDeliveries",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Delivery> getMyDeliveries() {
        log.debug("REST request to get my Deliveries");
        return deliveryRepository.findByUserIsCurrentUser();
    }
}
