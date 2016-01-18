package eu.epitech.andyet.web.rest;

import eu.epitech.andyet.Application;
import eu.epitech.andyet.domain.BaseProduct;
import eu.epitech.andyet.repository.BaseProductRepository;

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
 * Test class for the BaseProductResource REST controller.
 *
 * @see BaseProductResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest
public class BaseProductResourceIntTest {

    private static final String DEFAULT_NAME = "A";
    private static final String UPDATED_NAME = "B";
    private static final String DEFAULT_DESCRIPTION = "A";
    private static final String UPDATED_DESCRIPTION = "B";
    private static final String DEFAULT_IMAGE = "A";
    private static final String UPDATED_IMAGE = "B";

    private static final Float DEFAULT_RATING = 0F;
    private static final Float UPDATED_RATING = 1F;

    @Inject
    private BaseProductRepository baseProductRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restBaseProductMockMvc;

    private BaseProduct baseProduct;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        BaseProductResource baseProductResource = new BaseProductResource();
        ReflectionTestUtils.setField(baseProductResource, "baseProductRepository", baseProductRepository);
        this.restBaseProductMockMvc = MockMvcBuilders.standaloneSetup(baseProductResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        baseProduct = new BaseProduct();
        baseProduct.setName(DEFAULT_NAME);
        baseProduct.setDescription(DEFAULT_DESCRIPTION);
        baseProduct.setImage(DEFAULT_IMAGE);
        baseProduct.setRating(DEFAULT_RATING);
    }

    @Test
    @Transactional
    public void createBaseProduct() throws Exception {
        int databaseSizeBeforeCreate = baseProductRepository.findAll().size();

        // Create the BaseProduct

        restBaseProductMockMvc.perform(post("/api/baseProducts")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(baseProduct)))
                .andExpect(status().isCreated());

        // Validate the BaseProduct in the database
        List<BaseProduct> baseProducts = baseProductRepository.findAll();
        assertThat(baseProducts).hasSize(databaseSizeBeforeCreate + 1);
        BaseProduct testBaseProduct = baseProducts.get(baseProducts.size() - 1);
        assertThat(testBaseProduct.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testBaseProduct.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testBaseProduct.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testBaseProduct.getRating()).isEqualTo(DEFAULT_RATING);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = baseProductRepository.findAll().size();
        // set the field null
        baseProduct.setName(null);

        // Create the BaseProduct, which fails.

        restBaseProductMockMvc.perform(post("/api/baseProducts")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(baseProduct)))
                .andExpect(status().isBadRequest());

        List<BaseProduct> baseProducts = baseProductRepository.findAll();
        assertThat(baseProducts).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = baseProductRepository.findAll().size();
        // set the field null
        baseProduct.setDescription(null);

        // Create the BaseProduct, which fails.

        restBaseProductMockMvc.perform(post("/api/baseProducts")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(baseProduct)))
                .andExpect(status().isBadRequest());

        List<BaseProduct> baseProducts = baseProductRepository.findAll();
        assertThat(baseProducts).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkImageIsRequired() throws Exception {
        int databaseSizeBeforeTest = baseProductRepository.findAll().size();
        // set the field null
        baseProduct.setImage(null);

        // Create the BaseProduct, which fails.

        restBaseProductMockMvc.perform(post("/api/baseProducts")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(baseProduct)))
                .andExpect(status().isBadRequest());

        List<BaseProduct> baseProducts = baseProductRepository.findAll();
        assertThat(baseProducts).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRatingIsRequired() throws Exception {
        int databaseSizeBeforeTest = baseProductRepository.findAll().size();
        // set the field null
        baseProduct.setRating(null);

        // Create the BaseProduct, which fails.

        restBaseProductMockMvc.perform(post("/api/baseProducts")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(baseProduct)))
                .andExpect(status().isBadRequest());

        List<BaseProduct> baseProducts = baseProductRepository.findAll();
        assertThat(baseProducts).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBaseProducts() throws Exception {
        // Initialize the database
        baseProductRepository.saveAndFlush(baseProduct);

        // Get all the baseProducts
        restBaseProductMockMvc.perform(get("/api/baseProducts?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(baseProduct.getId().intValue())))
                .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
                .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
                .andExpect(jsonPath("$.[*].image").value(hasItem(DEFAULT_IMAGE.toString())))
                .andExpect(jsonPath("$.[*].rating").value(hasItem(DEFAULT_RATING.doubleValue())));
    }

    @Test
    @Transactional
    public void getBaseProduct() throws Exception {
        // Initialize the database
        baseProductRepository.saveAndFlush(baseProduct);

        // Get the baseProduct
        restBaseProductMockMvc.perform(get("/api/baseProducts/{id}", baseProduct.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(baseProduct.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.image").value(DEFAULT_IMAGE.toString()))
            .andExpect(jsonPath("$.rating").value(DEFAULT_RATING.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingBaseProduct() throws Exception {
        // Get the baseProduct
        restBaseProductMockMvc.perform(get("/api/baseProducts/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBaseProduct() throws Exception {
        // Initialize the database
        baseProductRepository.saveAndFlush(baseProduct);

		int databaseSizeBeforeUpdate = baseProductRepository.findAll().size();

        // Update the baseProduct
        baseProduct.setName(UPDATED_NAME);
        baseProduct.setDescription(UPDATED_DESCRIPTION);
        baseProduct.setImage(UPDATED_IMAGE);
        baseProduct.setRating(UPDATED_RATING);

        restBaseProductMockMvc.perform(put("/api/baseProducts")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(baseProduct)))
                .andExpect(status().isOk());

        // Validate the BaseProduct in the database
        List<BaseProduct> baseProducts = baseProductRepository.findAll();
        assertThat(baseProducts).hasSize(databaseSizeBeforeUpdate);
        BaseProduct testBaseProduct = baseProducts.get(baseProducts.size() - 1);
        assertThat(testBaseProduct.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testBaseProduct.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testBaseProduct.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testBaseProduct.getRating()).isEqualTo(UPDATED_RATING);
    }

    @Test
    @Transactional
    public void deleteBaseProduct() throws Exception {
        // Initialize the database
        baseProductRepository.saveAndFlush(baseProduct);

		int databaseSizeBeforeDelete = baseProductRepository.findAll().size();

        // Get the baseProduct
        restBaseProductMockMvc.perform(delete("/api/baseProducts/{id}", baseProduct.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<BaseProduct> baseProducts = baseProductRepository.findAll();
        assertThat(baseProducts).hasSize(databaseSizeBeforeDelete - 1);
    }
}
