package eu.epitech.andyet.web.rest;

import com.codahale.metrics.annotation.Timed;
import eu.epitech.andyet.domain.CartProductList;
import eu.epitech.andyet.repository.CartProductListRepository;
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
 * REST controller for managing CartProductList.
 */
@RestController
@RequestMapping("/api")
public class CartProductListResource {

    private final Logger log = LoggerFactory.getLogger(CartProductListResource.class);
        
    @Inject
    private CartProductListRepository cartProductListRepository;
    
    /**
     * POST  /cartProductLists -> Create a new cartProductList.
     */
    @RequestMapping(value = "/cartProductLists",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<CartProductList> createCartProductList(@Valid @RequestBody CartProductList cartProductList) throws URISyntaxException {
        log.debug("REST request to save CartProductList : {}", cartProductList);
        if (cartProductList.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("cartProductList", "idexists", "A new cartProductList cannot already have an ID")).body(null);
        }
        CartProductList result = cartProductListRepository.save(cartProductList);
        return ResponseEntity.created(new URI("/api/cartProductLists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("cartProductList", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cartProductLists -> Updates an existing cartProductList.
     */
    @RequestMapping(value = "/cartProductLists",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<CartProductList> updateCartProductList(@Valid @RequestBody CartProductList cartProductList) throws URISyntaxException {
        log.debug("REST request to update CartProductList : {}", cartProductList);
        if (cartProductList.getId() == null) {
            return createCartProductList(cartProductList);
        }
        CartProductList result = cartProductListRepository.save(cartProductList);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("cartProductList", cartProductList.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cartProductLists -> get all the cartProductLists.
     */
    @RequestMapping(value = "/cartProductLists",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<CartProductList>> getAllCartProductLists(Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get a page of CartProductLists");
        Page<CartProductList> page = cartProductListRepository.findAll(pageable); 
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/cartProductLists");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /cartProductLists/:id -> get the "id" cartProductList.
     */
    @RequestMapping(value = "/cartProductLists/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<CartProductList> getCartProductList(@PathVariable Long id) {
        log.debug("REST request to get CartProductList : {}", id);
        CartProductList cartProductList = cartProductListRepository.findOne(id);
        return Optional.ofNullable(cartProductList)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /cartProductLists/:id -> delete the "id" cartProductList.
     */
    @RequestMapping(value = "/cartProductLists/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteCartProductList(@PathVariable Long id) {
        log.debug("REST request to delete CartProductList : {}", id);
        cartProductListRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("cartProductList", id.toString())).build();
    }
}
