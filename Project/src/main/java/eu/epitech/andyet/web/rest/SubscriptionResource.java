package eu.epitech.andyet.web.rest;

import com.codahale.metrics.annotation.Timed;
import eu.epitech.andyet.domain.Subscription;
import eu.epitech.andyet.repository.SubscriptionRepository;
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
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Subscription.
 */
@RestController
@RequestMapping("/api")
public class SubscriptionResource {

    private final Logger log = LoggerFactory.getLogger(SubscriptionResource.class);
        
    @Inject
    private SubscriptionRepository subscriptionRepository;
    
    /**
     * POST  /subscriptions -> Create a new subscription.
     */
    @RequestMapping(value = "/subscriptions",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Subscription> createSubscription(@Valid @RequestBody Subscription subscription) throws URISyntaxException {
        log.debug("REST request to save Subscription : {}", subscription);
        if (subscription.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("subscription", "idexists", "A new subscription cannot already have an ID")).body(null);
        }
        Subscription result = subscriptionRepository.save(subscription);
        return ResponseEntity.created(new URI("/api/subscriptions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("subscription", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /subscriptions -> Updates an existing subscription.
     */
    @RequestMapping(value = "/subscriptions",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Subscription> updateSubscription(@Valid @RequestBody Subscription subscription) throws URISyntaxException {
        log.debug("REST request to update Subscription : {}", subscription);
        if (subscription.getId() == null) {
            return createSubscription(subscription);
        }
        Subscription result = subscriptionRepository.save(subscription);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("subscription", subscription.getId().toString()))
            .body(result);
    }

    /**
     * GET  /subscriptions -> get all the subscriptions.
     */
    @RequestMapping(value = "/subscriptions",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<Subscription>> getAllSubscriptions(Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get a page of Subscriptions");
        Page<Subscription> page = subscriptionRepository.findAll(pageable); 
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/subscriptions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /subscriptions/:id -> get the "id" subscription.
     */
    @RequestMapping(value = "/subscriptions/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Subscription> getSubscription(@PathVariable Long id) {
        log.debug("REST request to get Subscription : {}", id);
        Subscription subscription = subscriptionRepository.findOne(id);
        return Optional.ofNullable(subscription)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /subscriptions/:id -> delete the "id" subscription.
     */
    @RequestMapping(value = "/subscriptions/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteSubscription(@PathVariable Long id) {
        log.debug("REST request to delete Subscription : {}", id);
        subscriptionRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("subscription", id.toString())).build();
    }
}
