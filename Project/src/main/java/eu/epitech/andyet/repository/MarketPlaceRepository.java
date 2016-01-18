package eu.epitech.andyet.repository;

import eu.epitech.andyet.domain.MarketPlace;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the MarketPlace entity.
 */
public interface MarketPlaceRepository extends JpaRepository<MarketPlace,Long> {

}
