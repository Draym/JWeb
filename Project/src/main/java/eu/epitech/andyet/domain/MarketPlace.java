package eu.epitech.andyet.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A MarketPlace.
 */
@Entity
@Table(name = "market_place")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MarketPlace implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Size(min = 1)
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Size(min = 1)
    @Column(name = "image", nullable = false)
    private String image;

    @NotNull
    @Size(min = 1)
    @Column(name = "description", nullable = false)
    private String description;

    @NotNull
    @Min(value = 0)
    @Max(value = 5)
    @Column(name = "rating", nullable = false)
    private Integer rating;

    @OneToMany(mappedBy = "marketPlace")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<News> newss = new HashSet<>();

    @OneToOne
    private User user;

    @OneToMany(mappedBy = "marketPlace")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Product> products = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public Set<News> getNewss() {
        return newss;
    }

    public void setNewss(Set<News> newss) {
        this.newss = newss;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        MarketPlace marketPlace = (MarketPlace) o;
        return Objects.equals(id, marketPlace.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "MarketPlace{" +
            "id=" + id +
            ", name='" + name + "'" +
            ", image='" + image + "'" +
            ", description='" + description + "'" +
            ", rating='" + rating + "'" +
            '}';
    }
}
