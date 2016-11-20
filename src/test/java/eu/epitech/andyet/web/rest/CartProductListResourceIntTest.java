package eu.epitech.andyet.web.rest;

import eu.epitech.andyet.Application;
import eu.epitech.andyet.domain.CartProductList;
import eu.epitech.andyet.repository.CartProductListRepository;

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
 * Test class for the CartProductListResource REST controller.
 *
 * @see CartProductListResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest
public class CartProductListResourceIntTest {


    private static final Integer DEFAULT_QUANTITY = 0;
    private static final Integer UPDATED_QUANTITY = 1;

    @Inject
    private CartProductListRepository cartProductListRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restCartProductListMockMvc;

    private CartProductList cartProductList;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        CartProductListResource cartProductListResource = new CartProductListResource();
        ReflectionTestUtils.setField(cartProductListResource, "cartProductListRepository", cartProductListRepository);
        this.restCartProductListMockMvc = MockMvcBuilders.standaloneSetup(cartProductListResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        cartProductList = new CartProductList();
        cartProductList.setQuantity(DEFAULT_QUANTITY);
    }

    @Test
    @Transactional
    public void createCartProductList() throws Exception {
        int databaseSizeBeforeCreate = cartProductListRepository.findAll().size();

        // Create the CartProductList

        restCartProductListMockMvc.perform(post("/api/cartProductLists")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(cartProductList)))
                .andExpect(status().isCreated());

        // Validate the CartProductList in the database
        List<CartProductList> cartProductLists = cartProductListRepository.findAll();
        assertThat(cartProductLists).hasSize(databaseSizeBeforeCreate + 1);
        CartProductList testCartProductList = cartProductLists.get(cartProductLists.size() - 1);
        assertThat(testCartProductList.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
    }

    @Test
    @Transactional
    public void checkQuantityIsRequired() throws Exception {
        int databaseSizeBeforeTest = cartProductListRepository.findAll().size();
        // set the field null
        cartProductList.setQuantity(null);

        // Create the CartProductList, which fails.

        restCartProductListMockMvc.perform(post("/api/cartProductLists")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(cartProductList)))
                .andExpect(status().isBadRequest());

        List<CartProductList> cartProductLists = cartProductListRepository.findAll();
        assertThat(cartProductLists).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCartProductLists() throws Exception {
        // Initialize the database
        cartProductListRepository.saveAndFlush(cartProductList);

        // Get all the cartProductLists
        restCartProductListMockMvc.perform(get("/api/cartProductLists?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(cartProductList.getId().intValue())))
                .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)));
    }

    @Test
    @Transactional
    public void getCartProductList() throws Exception {
        // Initialize the database
        cartProductListRepository.saveAndFlush(cartProductList);

        // Get the cartProductList
        restCartProductListMockMvc.perform(get("/api/cartProductLists/{id}", cartProductList.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(cartProductList.getId().intValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY));
    }

    @Test
    @Transactional
    public void getNonExistingCartProductList() throws Exception {
        // Get the cartProductList
        restCartProductListMockMvc.perform(get("/api/cartProductLists/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCartProductList() throws Exception {
        // Initialize the database
        cartProductListRepository.saveAndFlush(cartProductList);

		int databaseSizeBeforeUpdate = cartProductListRepository.findAll().size();

        // Update the cartProductList
        cartProductList.setQuantity(UPDATED_QUANTITY);

        restCartProductListMockMvc.perform(put("/api/cartProductLists")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(cartProductList)))
                .andExpect(status().isOk());

        // Validate the CartProductList in the database
        List<CartProductList> cartProductLists = cartProductListRepository.findAll();
        assertThat(cartProductLists).hasSize(databaseSizeBeforeUpdate);
        CartProductList testCartProductList = cartProductLists.get(cartProductLists.size() - 1);
        assertThat(testCartProductList.getQuantity()).isEqualTo(UPDATED_QUANTITY);
    }

    @Test
    @Transactional
    public void deleteCartProductList() throws Exception {
        // Initialize the database
        cartProductListRepository.saveAndFlush(cartProductList);

		int databaseSizeBeforeDelete = cartProductListRepository.findAll().size();

        // Get the cartProductList
        restCartProductListMockMvc.perform(delete("/api/cartProductLists/{id}", cartProductList.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<CartProductList> cartProductLists = cartProductListRepository.findAll();
        assertThat(cartProductLists).hasSize(databaseSizeBeforeDelete - 1);
    }
}
