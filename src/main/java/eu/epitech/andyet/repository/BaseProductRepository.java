package eu.epitech.andyet.repository;

import eu.epitech.andyet.domain.BaseProduct;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the BaseProduct entity.
 */
public interface BaseProductRepository extends JpaRepository<BaseProduct,Long> {

}
