package eu.epitech.andyet.web.rest;

import eu.epitech.andyet.Application;
import eu.epitech.andyet.domain.Subscription;
import eu.epitech.andyet.repository.SubscriptionRepository;

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
 * Test class for the SubscriptionResource REST controller.
 *
 * @see SubscriptionResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest
public class SubscriptionResourceIntTest {


    private static final Long DEFAULT_ID_MARKET_PLACE = 0L;
    private static final Long UPDATED_ID_MARKET_PLACE = 1L;

    @Inject
    private SubscriptionRepository subscriptionRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restSubscriptionMockMvc;

    private Subscription subscription;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        SubscriptionResource subscriptionResource = new SubscriptionResource();
        ReflectionTestUtils.setField(subscriptionResource, "subscriptionRepository", subscriptionRepository);
        this.restSubscriptionMockMvc = MockMvcBuilders.standaloneSetup(subscriptionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        subscription = new Subscription();
        subscription.setIdMarketPlace(DEFAULT_ID_MARKET_PLACE);
    }

    @Test
    @Transactional
    public void createSubscription() throws Exception {
        int databaseSizeBeforeCreate = subscriptionRepository.findAll().size();

        // Create the Subscription

        restSubscriptionMockMvc.perform(post("/api/subscriptions")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(subscription)))
                .andExpect(status().isCreated());

        // Validate the Subscription in the database
        List<Subscription> subscriptions = subscriptionRepository.findAll();
        assertThat(subscriptions).hasSize(databaseSizeBeforeCreate + 1);
        Subscription testSubscription = subscriptions.get(subscriptions.size() - 1);
        assertThat(testSubscription.getIdMarketPlace()).isEqualTo(DEFAULT_ID_MARKET_PLACE);
    }

    @Test
    @Transactional
    public void checkIdMarketPlaceIsRequired() throws Exception {
        int databaseSizeBeforeTest = subscriptionRepository.findAll().size();
        // set the field null
        subscription.setIdMarketPlace(null);

        // Create the Subscription, which fails.

        restSubscriptionMockMvc.perform(post("/api/subscriptions")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(subscription)))
                .andExpect(status().isBadRequest());

        List<Subscription> subscriptions = subscriptionRepository.findAll();
        assertThat(subscriptions).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSubscriptions() throws Exception {
        // Initialize the database
        subscriptionRepository.saveAndFlush(subscription);

        // Get all the subscriptions
        restSubscriptionMockMvc.perform(get("/api/subscriptions?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(subscription.getId().intValue())))
                .andExpect(jsonPath("$.[*].idMarketPlace").value(hasItem(DEFAULT_ID_MARKET_PLACE.intValue())));
    }

    @Test
    @Transactional
    public void getSubscription() throws Exception {
        // Initialize the database
        subscriptionRepository.saveAndFlush(subscription);

        // Get the subscription
        restSubscriptionMockMvc.perform(get("/api/subscriptions/{id}", subscription.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(subscription.getId().intValue()))
            .andExpect(jsonPath("$.idMarketPlace").value(DEFAULT_ID_MARKET_PLACE.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingSubscription() throws Exception {
        // Get the subscription
        restSubscriptionMockMvc.perform(get("/api/subscriptions/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSubscription() throws Exception {
        // Initialize the database
        subscriptionRepository.saveAndFlush(subscription);

		int databaseSizeBeforeUpdate = subscriptionRepository.findAll().size();

        // Update the subscription
        subscription.setIdMarketPlace(UPDATED_ID_MARKET_PLACE);

        restSubscriptionMockMvc.perform(put("/api/subscriptions")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(subscription)))
                .andExpect(status().isOk());

        // Validate the Subscription in the database
        List<Subscription> subscriptions = subscriptionRepository.findAll();
        assertThat(subscriptions).hasSize(databaseSizeBeforeUpdate);
        Subscription testSubscription = subscriptions.get(subscriptions.size() - 1);
        assertThat(testSubscription.getIdMarketPlace()).isEqualTo(UPDATED_ID_MARKET_PLACE);
    }

    @Test
    @Transactional
    public void deleteSubscription() throws Exception {
        // Initialize the database
        subscriptionRepository.saveAndFlush(subscription);

		int databaseSizeBeforeDelete = subscriptionRepository.findAll().size();

        // Get the subscription
        restSubscriptionMockMvc.perform(delete("/api/subscriptions/{id}", subscription.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Subscription> subscriptions = subscriptionRepository.findAll();
        assertThat(subscriptions).hasSize(databaseSizeBeforeDelete - 1);
    }
}
