package eu.epitech.andyet.repository;

import eu.epitech.andyet.domain.Type;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Type entity.
 */
public interface TypeRepository extends JpaRepository<Type,Long> {

}
