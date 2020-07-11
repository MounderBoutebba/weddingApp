import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-section3',
  templateUrl: './section3.component.html',
  styleUrls: ['./section3.component.scss']
})
export class Section3Component implements OnInit {
  @Input() isBecomePartner = false;
  @Output() public goToTop: EventEmitter<boolean> = new EventEmitter<boolean>();

  title: string;
  description: string;
  btnLabel: string;
  columns: {icon: string, text: string}[];
  constructor() { }

  ngOnInit(): void {
    this.btnLabel = this.isBecomePartner ? `Devenir partenaire` : `Commencer`;
    this.title = this.isBecomePartner ? `Quels sont les avantages de notre partenariat ?` : `Mariez-vous l'esprit tranquille avec Winwez ?`;
    this.description = this.isBecomePartner ? `Proposez vos services et recevez des réservations en quelques cliques seulement. Votre réussite est également la notre. Lancez-vous !`
                        : `Winwez répond à tous les enjeux auxquels vous serez confrontés lors de l’organisation de votre mariage. Pour un mariage véritablement serein !`;
    this.columns = this.isBecomePartner ? [
      {icon: '/assets/icons/how-it-works/business-and-finance(3).png', text: `Vous disposez d’un espace personnalisé pour afficher toute les informations relatives à votre entreprise.`},
      {icon: '/assets/icons/how-it-works/checklist.png', text: `Avec Winwez, vous créez qu’une seule fois tous vos services et options puis recevez des réservations.`},
      {icon: '/assets/icons/how-it-works/commission.png', text: `Votre référencement est gratuit, sans forfait, ni engagement. Les frais de services sont débités que sur les réservations confirmés et payés.`},
      {icon: '/assets/icons/how-it-works/settings(1).png', text: `Vous gardez le contrôle et décidez de vos tarifs, de vos conditions, de vos disponibilités et de votre règlement pour les clients.`},
      {icon: '/assets/icons/how-it-works/badge.png', text: `Les prestataires sont nos partenaires, avec qui nous créons une véritable relation de confiance.`},
      {icon: '/assets/icons/how-it-works/professions-and-jobs.png', text: `Vous bénéficiez d'une assistance disponible 24h/24, 7j/7. Nos équipes vous aide tout au long de votre activité sur la plateforme.`},
    ]
    : [
      {icon: '/assets/icons/how-it-works/hands-and-gestures.png', text: `Besoin d’un crédit pour financer votre mariage ? Winwez vous accompagne dans la recherche du financement le plus avantageux et adapté.`},
      {icon: '/assets/icons/how-it-works/clock(1).png', text: `Échelonnez les paiements de vos réservations jusqu’à 5 fois sans frais, ni intérêts.`},
      {icon: '/assets/icons/how-it-works/calculators.png', text: `Maîtrisez vos dépenses, comparez et adaptez instantanément les prestataions selon son budget.`},
      {icon: '/assets/icons/how-it-works/business(3).png', text: `Choisissez Winwez pour vous couvrir des risques imprévisibles et assurer les multiples frais engagés dans votre mariage.`},
      {icon: '/assets/icons/how-it-works/food-and-restaurant.png', text: `Recherchez parmi les meilleurs prestataires du secteur nuptial et réservez des professionnels vérifiés qui répondent aux standards de qualité`},
      {icon: '/assets/icons/how-it-works/professions-and-jobs.png', text: `Vous profitez d’un accompagnement avant, pendant et après votre mariage. Et d'une assistance 24h/24 et 7j/7.`},
    ];
  }
  clicked() {
    this.goToTop.emit(true);
  }

}
