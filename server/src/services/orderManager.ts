import { Customer, Product } from './order.types.ts';
import { PricingService } from './pricingService.ts';
import { EmailService } from './emailService.ts';

export class OrderManager {
  private pricingService: PricingService;
  private emailService: EmailService;

  // Injection des dépendances
  constructor() {
    this.pricingService = new PricingService();
    this.emailService = new EmailService();
  }

  public processOrder(
    customer: Customer,
    product: Product,
    quantity: number,
    discountCode: string,
  ): number {
    this.validateCustomer(customer);
    this.checkInventory(product, quantity);

    const finalPrice = this.pricingService.calculateTotal(
      product.price,
      quantity,
      discountCode,
    );

    product.stock -= quantity; // Mise à jour du stock

    const message = `Votre commande pour ${quantity}x ${product.name} est confirmée. Total: ${finalPrice}€.`;
    this.emailService.sendEmail(customer.email, message);

    return finalPrice;
  }

  public calculateRefund(
    product: Product,
    quantity: number,
    discountCode: string,
  ): number {
    const refundAmount = this.pricingService.calculateTotal(
      product.price,
      quantity,
      discountCode,
    );

    this.emailService.sendEmail(
      "admin@magasin.com",
      `Remboursement traité. Montant: ${refundAmount}€.`,
    );

    return refundAmount;
  }

  // Méthodes privées d'aide (réduit la taille de processOrder)
  private validateCustomer(customer: Customer): void {
    if (!customer.email.includes("@") || customer.firstName === "") {
      throw new Error("Utilisateur invalide");
    }
  }

  private checkInventory(product: Product, quantity: number): void {
    if (quantity > product.stock) {
      throw new Error("Stock insuffisant");
    }
  }
}