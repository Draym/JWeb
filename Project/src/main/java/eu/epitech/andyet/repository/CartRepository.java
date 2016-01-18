package eu.epitech.andyet.repository;

import eu.epitech.andyet.domain.Cart;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Cart entity.
 */
public interface CartRepository extends JpaRepository<Cart,Long> {

    @Query("select cart from Cart cart where cart.user.login = ?#{principal.username}")
    List<Cart> findByUserIsCurrentUser();
}
