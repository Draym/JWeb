package eu.epitech.andyet.repository;

import eu.epitech.andyet.domain.Delivery;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Delivery entity.
 */
public interface DeliveryRepository extends JpaRepository<Delivery,Long> {

    @Query("select delivery from Delivery delivery where delivery.user.login = ?#{principal.username}")
    List<Delivery> findByUserIsCurrentUser();

}
