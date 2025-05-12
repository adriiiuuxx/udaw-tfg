package es.adrian.udaw_eats.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.proxy.HibernateProxy;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

/**
 * Order Entity
 * <p>
 * This entity represents a customer's order in the UDAW-Eats food delivery system.
 * It serves as the central model that connects users, restaurants, delivery addresses,
 * and order items together in a meaningful business transaction.
 * <p>
 * Key relationships:
 * <ul>
 *   <li>Many-to-One with User (customer): Each order belongs to one customer</li>
 *   <li>Many-to-One with Restaurant: Each order is placed at one restaurant</li>
 *   <li>Many-to-One with Address: Each order is delivered to one address</li>
 *   <li>One-to-Many with OrderItem: Each order contains multiple order items</li>
 * </ul>
 * <p>
 * The order status tracks the delivery progress (PENDING, OUT_FOR_DELIVERY, DELIVERED, COMPLETED).
 * Total price and total items are calculated based on the order items.
 * <p>
 * Note: The table is named "orders" to avoid conflicts with SQL reserved keywords.
 */
@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    /**
     * The customer who placed this order.
     * <p>
     * This establishes a Many-to-One relationship with the User entity.
     * One user can place many orders, but each order belongs to exactly one user.
     */
    @ManyToOne
    private User customer;

    /**
     * The restaurant from which this order was placed.
     * <p>
     * This establishes a Many-to-One relationship with the Restaurant entity.
     * One restaurant can receive many orders, but each order is placed at exactly one restaurant.
     * <p>
     * The @JsonIgnore annotation prevents circular references during JSON serialization.
     */
    @JsonIgnore
    @ManyToOne
    private Restaurant restaurant;

    /**
     * The current status of the order in the delivery lifecycle.
     * <p>
     * Possible values include:
     * <ul>
     *   <li>PENDING: Order has been placed but not yet processed</li>
     *   <li>OUT_FOR_DELIVERY: Order is being delivered</li>
     *   <li>DELIVERED: Order has been delivered to the customer</li>
     *   <li>COMPLETED: Order has been delivered and confirmed as completed</li>
     * </ul>
     */
    private String orderStatus;

    private Date createdAt;

    @ManyToOne
    private Address deliveryAddress;

    /**
     * The list of items included in this order.
     * <p>
     * This establishes a One-to-Many relationship with the OrderItem entity.
     * One order can contain many order items, and each order item belongs to exactly one order.
     * <p>
     * The relationship is bidirectional, with OrderItem.order being the owning side.
     * <p>
     * Cascade type ALL ensures that operations on orders cascade to their items.
     * Orphan removal ensures that when an item is removed from the order, it's deleted from the database.
     * FetchType.EAGER ensures that items are always loaded with the order, which is important for
     * calculating totals and displaying order details.
     */
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<OrderItem> items = new ArrayList<>();

    private int totalItem;

    private Long totalPrice;

    // private Payment payment;

    /**
     * Compares this Order with another object for equality.
     * <p>
     * This implementation handles Hibernate proxies correctly by comparing the ID field only.
     * Two orders are considered equal if they have the same non-null ID, regardless of other fields.
     * This is important for proper functioning with Hibernate's lazy loading and collections.
     *
     * @param o The object to compare with this Order
     * @return true if the objects are equal, false otherwise
     */
    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        Order order = (Order) o;
        return getId() != null && Objects.equals(getId(), order.getId());
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }
}
