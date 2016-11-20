package eu.epitech.andyet.repository;

import eu.epitech.andyet.domain.CartProductList;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the CartProductList entity.
 */
public interface CartProductListRepository extends JpaRepository<CartProductList,Long> {

}
