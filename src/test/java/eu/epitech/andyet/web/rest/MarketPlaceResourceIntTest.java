package eu.epitech.andyet.web.rest;

import eu.epitech.andyet.Application;
import eu.epitech.andyet.domain.MarketPlace;
import eu.epitech.andyet.repository.MarketPlaceRepository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.Matchers.hasItem;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


/**
 * Test class for the MarketPlaceResource REST controller.
 *
 * @see MarketPlaceResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest
public class MarketPlaceResourceIntTest {

    private static final String DEFAULT_NAME = "A";
    private static final String UPDATED_NAME = "B";
    private static final String DEFAULT_IMAGE = "A";
    private static final String UPDATED_IMAGE = "B";
    private static final String DEFAULT_DESCRIPTION = "A";
    private static final String UPDATED_DESCRIPTION = "B";

    private static final Integer DEFAULT_RATING = 0;
    private static final Integer UPDATED_RATING = 1;

    @Inject
    private MarketPlaceRepository marketPlaceRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restMarketPlaceMockMvc;

    private MarketPlace marketPlace;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        MarketPlaceResource marketPlaceResource = new MarketPlaceResource();
        ReflectionTestUtils.setField(marketPlaceResource, "marketPlaceRepository", marketPlaceRepository);
        this.restMarketPlaceMockMvc = MockMvcBuilders.standaloneSetup(marketPlaceResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        marketPlace = new MarketPlace();
        marketPlace.setName(DEFAULT_NAME);
        marketPlace.setImage(DEFAULT_IMAGE);
        marketPlace.setDescription(DEFAULT_DESCRIPTION);
        marketPlace.setRating(DEFAULT_RATING);
    }

    @Test
    @Transactional
    public void createMarketPlace() throws Exception {
        int databaseSizeBeforeCreate = marketPlaceRepository.findAll().size();

        // Create the MarketPlace

        restMarketPlaceMockMvc.perform(post("/api/marketPlaces")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(marketPlace)))
                .andExpect(status().isCreated());

        // Validate the MarketPlace in the database
        List<MarketPlace> marketPlaces = marketPlaceRepository.findAll();
        assertThat(marketPlaces).hasSize(databaseSizeBeforeCreate + 1);
        MarketPlace testMarketPlace = marketPlaces.get(marketPlaces.size() - 1);
        assertThat(testMarketPlace.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testMarketPlace.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testMarketPlace.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testMarketPlace.getRating()).isEqualTo(DEFAULT_RATING);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = marketPlaceRepository.findAll().size();
        // set the field null
        marketPlace.setName(null);

        // Create the MarketPlace, which fails.

        restMarketPlaceMockMvc.perform(post("/api/marketPlaces")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(marketPlace)))
                .andExpect(status().isBadRequest());

        List<MarketPlace> marketPlaces = marketPlaceRepository.findAll();
        assertThat(marketPlaces).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkImageIsRequired() throws Exception {
        int databaseSizeBeforeTest = marketPlaceRepository.findAll().size();
        // set the field null
        marketPlace.setImage(null);

        // Create the MarketPlace, which fails.

        restMarketPlaceMockMvc.perform(post("/api/marketPlaces")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(marketPlace)))
                .andExpect(status().isBadRequest());

        List<MarketPlace> marketPlaces = marketPlaceRepository.findAll();
        assertThat(marketPlaces).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = marketPlaceRepository.findAll().size();
        // set the field null
        marketPlace.setDescription(null);

        // Create the MarketPlace, which fails.

        restMarketPlaceMockMvc.perform(post("/api/marketPlaces")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(marketPlace)))
                .andExpect(status().isBadRequest());

        List<MarketPlace> marketPlaces = marketPlaceRepository.findAll();
        assertThat(marketPlaces).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRatingIsRequired() throws Exception {
        int databaseSizeBeforeTest = marketPlaceRepository.findAll().size();
        // set the field null
        marketPlace.setRating(null);

        // Create the MarketPlace, which fails.

        restMarketPlaceMockMvc.perform(post("/api/marketPlaces")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(marketPlace)))
                .andExpect(status().isBadRequest());

        List<MarketPlace> marketPlaces = marketPlaceRepository.findAll();
        assertThat(marketPlaces).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMarketPlaces() throws Exception {
        // Initialize the database
        marketPlaceRepository.saveAndFlush(marketPlace);

        // Get all the marketPlaces
        restMarketPlaceMockMvc.perform(get("/api/marketPlaces?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(marketPlace.getId().intValue())))
                .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
                .andExpect(jsonPath("$.[*].image").value(hasItem(DEFAULT_IMAGE.toString())))
                .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
                .andExpect(jsonPath("$.[*].rating").value(hasItem(DEFAULT_RATING)));
    }

    @Test
    @Transactional
    public void getMarketPlace() throws Exception {
        // Initialize the database
        marketPlaceRepository.saveAndFlush(marketPlace);

        // Get the marketPlace
        restMarketPlaceMockMvc.perform(get("/api/marketPlaces/{id}", marketPlace.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(marketPlace.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.image").value(DEFAULT_IMAGE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.rating").value(DEFAULT_RATING));
    }

    @Test
    @Transactional
    public void getNonExistingMarketPlace() throws Exception {
        // Get the marketPlace
        restMarketPlaceMockMvc.perform(get("/api/marketPlaces/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMarketPlace() throws Exception {
        // Initialize the database
        marketPlaceRepository.saveAndFlush(marketPlace);

		int databaseSizeBeforeUpdate = marketPlaceRepository.findAll().size();

        // Update the marketPlace
        marketPlace.setName(UPDATED_NAME);
        marketPlace.setImage(UPDATED_IMAGE);
        marketPlace.setDescription(UPDATED_DESCRIPTION);
        marketPlace.setRating(UPDATED_RATING);

        restMarketPlaceMockMvc.perform(put("/api/marketPlaces")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(marketPlace)))
                .andExpect(status().isOk());

        // Validate the MarketPlace in the database
        List<MarketPlace> marketPlaces = marketPlaceRepository.findAll();
        assertThat(marketPlaces).hasSize(databaseSizeBeforeUpdate);
        MarketPlace testMarketPlace = marketPlaces.get(marketPlaces.size() - 1);
        assertThat(testMarketPlace.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testMarketPlace.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testMarketPlace.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testMarketPlace.getRating()).isEqualTo(UPDATED_RATING);
    }

    @Test
    @Transactional
    public void deleteMarketPlace() throws Exception {
        // Initialize the database
        marketPlaceRepository.saveAndFlush(marketPlace);

		int databaseSizeBeforeDelete = marketPlaceRepository.findAll().size();

        // Get the marketPlace
        restMarketPlaceMockMvc.perform(delete("/api/marketPlaces/{id}", marketPlace.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<MarketPlace> marketPlaces = marketPlaceRepository.findAll();
        assertThat(marketPlaces).hasSize(databaseSizeBeforeDelete - 1);
    }
}
