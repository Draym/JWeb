package eu.epitech.andyet.web.rest;

import com.codahale.metrics.annotation.Timed;
import eu.epitech.andyet.domain.BaseProduct;
import eu.epitech.andyet.repository.BaseProductRepository;
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
 * REST controller for managing BaseProduct.
 */
@RestController
@RequestMapping("/api")
public class BaseProductResource {

    private final Logger log = LoggerFactory.getLogger(BaseProductResource.class);

    @Inject
    private BaseProductRepository baseProductRepository;

    /**
     * POST  /baseProducts -> Create a new baseProduct.
     */
    @RequestMapping(value = "/baseProducts",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<BaseProduct> createBaseProduct(@Valid @RequestBody BaseProduct baseProduct) throws URISyntaxException {
        log.debug("REST request to save BaseProduct : {}", baseProduct);
        if (baseProduct.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("baseProduct", "idexists", "A new baseProduct cannot already have an ID")).body(null);
        }
        BaseProduct result = baseProductRepository.save(baseProduct);
        return ResponseEntity.created(new URI("/api/baseProducts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("baseProduct", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /baseProducts -> Updates an existing baseProduct.
     */
    @RequestMapping(value = "/baseProducts",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<BaseProduct> updateBaseProduct(@Valid @RequestBody BaseProduct baseProduct) throws URISyntaxException {
        log.debug("REST request to update BaseProduct : {}", baseProduct);
        if (baseProduct.getId() == null) {
            return createBaseProduct(baseProduct);
        }
        BaseProduct result = baseProductRepository.save(baseProduct);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("baseProduct", baseProduct.getId().toString()))
            .body(result);
    }

    /**
     * GET  /baseProducts -> get all the baseProducts.
     */
    @RequestMapping(value = "/baseProducts",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<BaseProduct>> getAllBaseProducts(Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get a page of BaseProducts");
        Page<BaseProduct> page = baseProductRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/baseProducts");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /baseProducts/:id -> get the "id" baseProduct.
     */
    @RequestMapping(value = "/baseProducts/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<BaseProduct> getBaseProduct(@PathVariable Long id) {
        log.debug("REST request to get BaseProduct : {}", id);
        BaseProduct baseProduct = baseProductRepository.findOne(id);
        return Optional.ofNullable(baseProduct)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /baseProducts/:id -> delete the "id" baseProduct.
     */
    @RequestMapping(value = "/baseProducts/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteBaseProduct(@PathVariable Long id) {
        log.debug("REST request to delete BaseProduct : {}", id);
        baseProductRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("baseProduct", id.toString())).build();
    }

    /**
     * GET  /allBaseProducts -> get all the baseProducts.
     */
    @RequestMapping(value = "/allBaseProducts",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<BaseProduct> getAllBaseProducts() {
        log.debug("REST request to get a page of BaseProducts");
        return baseProductRepository.findAll();
    }
}
