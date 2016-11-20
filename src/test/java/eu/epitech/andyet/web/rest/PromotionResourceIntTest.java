package eu.epitech.andyet.web.rest;

import eu.epitech.andyet.Application;
import eu.epitech.andyet.domain.Promotion;
import eu.epitech.andyet.repository.PromotionRepository;

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
 * Test class for the PromotionResource REST controller.
 *
 * @see PromotionResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest
public class PromotionResourceIntTest {

    private static final String DEFAULT_NAME = "A";
    private static final String UPDATED_NAME = "B";

    private static final Integer DEFAULT_PERCENT = 0;
    private static final Integer UPDATED_PERCENT = 1;

    private static final Float DEFAULT_REDUCTION = 0F;
    private static final Float UPDATED_REDUCTION = 1F;

    @Inject
    private PromotionRepository promotionRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restPromotionMockMvc;

    private Promotion promotion;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        PromotionResource promotionResource = new PromotionResource();
        ReflectionTestUtils.setField(promotionResource, "promotionRepository", promotionRepository);
        this.restPromotionMockMvc = MockMvcBuilders.standaloneSetup(promotionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        promotion = new Promotion();
        promotion.setName(DEFAULT_NAME);
        promotion.setPercent(DEFAULT_PERCENT);
        promotion.setReduction(DEFAULT_REDUCTION);
    }

    @Test
    @Transactional
    public void createPromotion() throws Exception {
        int databaseSizeBeforeCreate = promotionRepository.findAll().size();

        // Create the Promotion

        restPromotionMockMvc.perform(post("/api/promotions")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(promotion)))
                .andExpect(status().isCreated());

        // Validate the Promotion in the database
        List<Promotion> promotions = promotionRepository.findAll();
        assertThat(promotions).hasSize(databaseSizeBeforeCreate + 1);
        Promotion testPromotion = promotions.get(promotions.size() - 1);
        assertThat(testPromotion.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPromotion.getPercent()).isEqualTo(DEFAULT_PERCENT);
        assertThat(testPromotion.getReduction()).isEqualTo(DEFAULT_REDUCTION);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = promotionRepository.findAll().size();
        // set the field null
        promotion.setName(null);

        // Create the Promotion, which fails.

        restPromotionMockMvc.perform(post("/api/promotions")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(promotion)))
                .andExpect(status().isBadRequest());

        List<Promotion> promotions = promotionRepository.findAll();
        assertThat(promotions).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPercentIsRequired() throws Exception {
        int databaseSizeBeforeTest = promotionRepository.findAll().size();
        // set the field null
        promotion.setPercent(null);

        // Create the Promotion, which fails.

        restPromotionMockMvc.perform(post("/api/promotions")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(promotion)))
                .andExpect(status().isBadRequest());

        List<Promotion> promotions = promotionRepository.findAll();
        assertThat(promotions).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkReductionIsRequired() throws Exception {
        int databaseSizeBeforeTest = promotionRepository.findAll().size();
        // set the field null
        promotion.setReduction(null);

        // Create the Promotion, which fails.

        restPromotionMockMvc.perform(post("/api/promotions")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(promotion)))
                .andExpect(status().isBadRequest());

        List<Promotion> promotions = promotionRepository.findAll();
        assertThat(promotions).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPromotions() throws Exception {
        // Initialize the database
        promotionRepository.saveAndFlush(promotion);

        // Get all the promotions
        restPromotionMockMvc.perform(get("/api/promotions?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(promotion.getId().intValue())))
                .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
                .andExpect(jsonPath("$.[*].percent").value(hasItem(DEFAULT_PERCENT)))
                .andExpect(jsonPath("$.[*].reduction").value(hasItem(DEFAULT_REDUCTION.doubleValue())));
    }

    @Test
    @Transactional
    public void getPromotion() throws Exception {
        // Initialize the database
        promotionRepository.saveAndFlush(promotion);

        // Get the promotion
        restPromotionMockMvc.perform(get("/api/promotions/{id}", promotion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(promotion.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.percent").value(DEFAULT_PERCENT))
            .andExpect(jsonPath("$.reduction").value(DEFAULT_REDUCTION.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPromotion() throws Exception {
        // Get the promotion
        restPromotionMockMvc.perform(get("/api/promotions/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePromotion() throws Exception {
        // Initialize the database
        promotionRepository.saveAndFlush(promotion);

		int databaseSizeBeforeUpdate = promotionRepository.findAll().size();

        // Update the promotion
        promotion.setName(UPDATED_NAME);
        promotion.setPercent(UPDATED_PERCENT);
        promotion.setReduction(UPDATED_REDUCTION);

        restPromotionMockMvc.perform(put("/api/promotions")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(promotion)))
                .andExpect(status().isOk());

        // Validate the Promotion in the database
        List<Promotion> promotions = promotionRepository.findAll();
        assertThat(promotions).hasSize(databaseSizeBeforeUpdate);
        Promotion testPromotion = promotions.get(promotions.size() - 1);
        assertThat(testPromotion.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPromotion.getPercent()).isEqualTo(UPDATED_PERCENT);
        assertThat(testPromotion.getReduction()).isEqualTo(UPDATED_REDUCTION);
    }

    @Test
    @Transactional
    public void deletePromotion() throws Exception {
        // Initialize the database
        promotionRepository.saveAndFlush(promotion);

		int databaseSizeBeforeDelete = promotionRepository.findAll().size();

        // Get the promotion
        restPromotionMockMvc.perform(delete("/api/promotions/{id}", promotion.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Promotion> promotions = promotionRepository.findAll();
        assertThat(promotions).hasSize(databaseSizeBeforeDelete - 1);
    }
}
