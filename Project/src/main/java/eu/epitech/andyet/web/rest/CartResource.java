package eu.epitech.andyet.web.rest;

import com.codahale.metrics.annotation.Timed;
import eu.epitech.andyet.domain.Cart;
import eu.epitech.andyet.domain.CartProductList;
import eu.epitech.andyet.repository.CartProductListRepository;
import eu.epitech.andyet.repository.CartRepository;
import eu.epitech.andyet.repository.DeliveryRepository;
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
 * REST controller for managing Cart.
 */
@RestController
@RequestMapping("/api")
public class CartResource {

    private final Logger log = LoggerFactory.getLogger(CartResource.class);

    @Inject
    private CartRepository cartRepository;

    @Inject
    private DeliveryRepository deliveryRepository;

    @Inject
    private CartProductListRepository cartProductListRepository;

    /**
     * POST  /carts -> Create a new cart.
     */
    @RequestMapping(value = "/carts",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Cart> createCart(@Valid @RequestBody Cart cart) throws URISyntaxException {
        log.debug("REST request to save Cart : {}", cart);
        if (cart.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("cart", "idexists", "A new cart cannot already have an ID")).body(null);
        }
        Cart result = cartRepository.save(cart);
        return ResponseEntity.created(new URI("/api/carts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("cart", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /carts -> Updates an existing cart.
     */
    @RequestMapping(value = "/carts",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Cart> updateCart(@Valid @RequestBody Cart cart) throws URISyntaxException {
        log.debug("REST request to update Cart : {}", cart);
        if (cart.getId() == null) {
            return createCart(cart);
        }
        Cart result = cartRepository.save(cart);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("cart", cart.getId().toString()))
            .body(result);
    }

    /**
     * GET  /carts -> get all the carts.
     */
    @RequestMapping(value = "/carts",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<Cart>> getAllCarts(Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get a page of Carts");
        Page<Cart> page = cartRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/carts");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /carts/:id -> get the "id" cart.
     */
    @RequestMapping(value = "/carts/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Cart> getCart(@PathVariable Long id) {
        log.debug("REST request to get Cart : {}", id);
        Cart cart = cartRepository.findOne(id);
        return Optional.ofNullable(cart)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /carts/:id -> delete the "id" cart.
     */
    @RequestMapping(value = "/carts/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteCart(@PathVariable Long id) {
        log.debug("REST request to delete Cart : {}", id);
        cartRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("cart", id.toString())).build();
    }

    /**
     * GET  /myCarts -> get all my carts.
     */
    @RequestMapping(value = "/myCarts",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Cart> getMyCarts() {
        log.debug("REST request to get my Carts");
        return cartRepository.findByUserIsCurrentUser().stream().filter(cart -> (deliveryRepository.findByUserIsCurrentUser().stream().filter(delivery -> delivery.getCart().equals(cart)).collect(Collectors.toList()).size() == 0)).collect(Collectors.toList());
    }

    /**
     * GET  /cartProducts/:id -> get products in the "id" cart.
     */
    @RequestMapping(value = "/cartProducts/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<CartProductList> getCartProducts(@PathVariable Long id) {
        log.debug("REST request to get products in the Cart: {}", id);
        return cartProductListRepository.findAll().stream().filter(item -> item.getCart().getId().equals(id)).collect(Collectors.toList());
    }
}
