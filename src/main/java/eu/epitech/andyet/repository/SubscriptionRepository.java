package eu.epitech.andyet.repository;

import eu.epitech.andyet.domain.Subscription;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Subscription entity.
 */
public interface SubscriptionRepository extends JpaRepository<Subscription,Long> {

    @Query("select subscription from Subscription subscription where subscription.user.login = ?#{principal.username}")
    List<Subscription> findByUserIsCurrentUser();

}
