package eu.epitech.andyet.web.rest;

import com.codahale.metrics.annotation.Timed;
import eu.epitech.andyet.domain.MarketPlace;
import eu.epitech.andyet.domain.Product;
import eu.epitech.andyet.repository.MarketPlaceRepository;
import eu.epitech.andyet.repository.ProductRepository;
import eu.epitech.andyet.service.UserService;
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
import java.util.stream.Collectors;

/**
 * REST controller for managing MarketPlace.
 */
@RestController
@RequestMapping("/api")
public class MarketPlaceResource {

    private final Logger log = LoggerFactory.getLogger(MarketPlaceResource.class);

    @Inject
    private MarketPlaceRepository marketPlaceRepository;

    @Inject
    private UserService userService;

    @Inject
    private ProductRepository productRepository;

    /**
     * POST  /marketPlaces -> Create a new marketPlace.
     */
    @RequestMapping(value = "/marketPlaces",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<MarketPlace> createMarketPlace(@Valid @RequestBody MarketPlace marketPlace) throws URISyntaxException {
        log.debug("REST request to save MarketPlace : {}", marketPlace);
        if (marketPlace.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("marketPlace", "idexists", "A new marketPlace cannot already have an ID")).body(null);
        }
        MarketPlace result = marketPlaceRepository.save(marketPlace);
        return ResponseEntity.created(new URI("/api/marketPlaces/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("marketPlace", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /marketPlaces -> Updates an existing marketPlace.
     */
    @RequestMapping(value = "/marketPlaces",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<MarketPlace> updateMarketPlace(@Valid @RequestBody MarketPlace marketPlace) throws URISyntaxException {
        log.debug("REST request to update MarketPlace : {}", marketPlace);
        if (marketPlace.getId() == null) {
            return createMarketPlace(marketPlace);
        }
        MarketPlace result = marketPlaceRepository.save(marketPlace);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("marketPlace", marketPlace.getId().toString()))
            .body(result);
    }

    /**
     * GET  /marketPlaces -> get all the marketPlaces.
     */
    @RequestMapping(value = "/marketPlaces",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<MarketPlace>> getAllMarketPlaces(Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get a page of MarketPlaces");
        Page<MarketPlace> page = marketPlaceRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/marketPlaces");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /marketPlaces/:id -> get the "id" marketPlace.
     */
    @RequestMapping(value = "/marketPlaces/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<MarketPlace> getMarketPlace(@PathVariable Long id) {
        log.debug("REST request to get MarketPlace : {}", id);
        MarketPlace marketPlace = marketPlaceRepository.findOne(id);
        return Optional.ofNullable(marketPlace)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /marketPlaces/:id -> delete the "id" marketPlace.
     */
    @RequestMapping(value = "/marketPlaces/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteMarketPlace(@PathVariable Long id) {
        log.debug("REST request to delete MarketPlace : {}", id);
        marketPlaceRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("marketPlace", id.toString())).build();
    }

    /**
     * GET  /myMarketPlace -> get my marketPlace.
     */
    @RequestMapping(value = "/myMarketPlace",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public MarketPlace getMyMarketPlace() {
        log.debug("REST request to get my MarketPlaces");
        return marketPlaceRepository.findAll().stream().filter(item -> item.getUser().getId().equals(userService.getUserWithAuthorities().getId())).findFirst().get();
    }

    /**
     * GET  /marketPlaces/:id/products -> get my marketPlace.
     */
    @RequestMapping(value = "/marketPlaces/{id}/products",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Product> getMarketPlaceProducts(@PathVariable Long id) {
        log.debug("REST request to get all product in MarketPlace: {}", id);
        return productRepository.findAll().stream().filter(item -> item.getMarketPlace().getId().equals(id)).collect(Collectors.toList());
    }
}
