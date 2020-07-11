import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-section6',
  templateUrl: './section6.component.html',
  styleUrls: ['./section6.component.scss']
})
export class Section6Component implements OnInit {
  @Input() isBecomePartner = false;
  @Output() public goToTop: EventEmitter<boolean> = new EventEmitter<boolean>();
  columns: {title: string, labels: string[]}[];
  bottomLabel: string;
  constructor() { }

  ngOnInit(): void {
    this.bottomLabel = this.isBecomePartner ? `Vous voulez que vos services apparaissent sur Winwez ?`
                                            : `Vous êtes prestataire ? Devenez partenaire Winwez !`;
    this.columns = this.isBecomePartner ? [
      {title: `Pourquoi utiliser Winwez ?`,
      labels: [
        `Winwez est aussi un excellent partenaire business. Pour vous professionnels, il vous permet de gagner du temps en réduisant considérablement les tâches redondantes tel que la prospection de nouveaux clients, la création de devis,  les demandes clients, la facturation, la gestion des impayés et bien plus.`,
        `Vous recevez des réservations prêtes à signer. Ainsi, vous  développez votre chiffre d’affaires sans démarchage. En fin de mission, vous obtenez un avis de la part du client. Cela améliore votre e-réputation et vous permet d’obtenir plus de réservations.`,
      ]},
      {title: `Dois-je souscrire à un forfait ?`,
      labels: [
        `Non, votre référencement est totalement gratuit et ne comporte ni forfait, ni engagement.
        Avec Winwez vous ne prenez aucun risque.`,
        `Les frais de service de la plateforme sont de 10%ht et sont prélevés sur la valeur globale de la prestation après sa réservation validée et payée par le client.`,
      ]},
      {title: `Puis-je imposer le versement d’un accompte ?`,
      labels: [
        `Oui, pour ce faire il suffit de renseigner cette condition lors de la création de votre service.`,
        `Si le client accepte vos conditions (paiement avec acompte), nous vous transmettons par virement le montant de l’acompte dès que le paiement est effectué.`,
      ]},
      {title: `Comment fonctionne le paiement d’une réservation ?`,
      labels: [
        `Lorsque vous acceptez une demande de réservation, le client est invité à régler le montant du service.`,
        `Pour simplifier les transactions, notre système de paiement sécurisé permet au client de choisir le paiement comptant ou le paiement échelonné jusqu’à 5 fois sans frais.`,
        `Nous procèdons au versement du montant de la commande directement sur votre compte bancaire connecté.`,
      ]},
    ]
    : [
      {title: `Pourquoi utiliser Winwez ?`,
      labels: [
        `Avec Winwez vous bénéficiez gratuitement de multiples services intelligents qui vous permettent de trouver, comparer et réserver en toute simplicité et sécurité les prestataires de votre mariage.`,
        `Grâce à sa solution de paiement sécurisé,  les réservations sont directement réglées sur la plateforme et profitent instantanément d’une assurance sur un panel de risques.`,
        `Winwez est votre intermédiaire de confiance et vous accompagne tout le long de l’organisation de votre mariage.`,
      ]},
      {title: `Puis-je profiter d’un accompagnement ?`,
      labels: [
        `Oui, vous bénéficiez d’un accompagnement avant, pendant et après votre mariage. Nous sommes là pour vous aider tout au long de votre expérience avec Winwez.`,
        `Aussi, vous pofitez d’une assitance pour toute urgence. Winwez s’engage à vous proposer un nouveau prestataire en cas d’annulation au même prix et conditions.`,
      ]},
      {title: `Dois-je payer des frais d'inscription ou de réservation ?`,
      labels: [
        `Non, pour les futurs mariés les services sont totalement gratuits.`,
        `Vous n'êtes donc pas redevable de frais de service et vos réservations profitent gratuitement et instantanément des garanties Winwez.`,
      ]},
      {title: `Comment mes paiements sont-ils protégés ?`,
      labels: [
        `Le modèle Winwez est le plus fiable pour réserver les prestataires de votre mariage et garantir votre relation.`,
        `Pour votre sécurité, les fonds sont protégés et bloqués dans un compte séquestre conforme à la réglementation DSP2.`,
        `Winwez procède au versement de vos paiements après la réalisation complète des missions.`,
      ]},
    ];
  }
  clicked() {
    this.goToTop.emit(true);
  }

}
