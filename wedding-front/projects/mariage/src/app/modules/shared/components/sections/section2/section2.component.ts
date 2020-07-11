import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-section2',
  templateUrl: './section2.component.html',
  styleUrls: ['./section2.component.scss']
})
export class Section2Component implements OnInit {
  @Input() isBecomePartner = false;
  columns: {icon: string, title: string, text1: string, text2: string}[];
  title: string;
  constructor() { }

  ngOnInit(): void {
    this.columns = this.isBecomePartner ? [
      {icon: '/assets/icons/how-it-works/money(6).png',
      title: `Augmentez votre chiffre d'affaires`,
      text1: `C’est la solution efficace pour augmenter le nombre de réservations et combler vos dates encore
      disponibles. Avec Winwez, les réservations sont concrètes et prêtes à signer.`,
      text2: `Un véritable partenaire qui se préocupe aussi de vos intérêts !`,
      },

      {icon: '/assets/icons/how-it-works/high-five.png',
      title: `Développez votre clientèle`,
      text1: `Attirez une nouvelle clientèle de jeunes futurs mariés qui n’ont qu'une envie : réserver leurs prestataires de mariage en toute facilité, sécurité et sérénité !`,
      text2: ` Pas de forfait, pas d’engagement, pas de promesses en l’air !`,
      },

      {icon: '/assets/icons/how-it-works/time.png',
      title: `Optimisez votre temps`,
      text1: `Concentrez-vous sur le cœur de votre métier. Gâce à Winwez vous réalisez des économies d'échelle en réduisant considérablement les tâches redondantes et à faible valeur ajoutée.`,
      text2: `Vous n’avez plus besoin de créer des devis à longueur de journée.`,
      },
    ]
    : [
      {icon: '/assets/icons/how-it-works/tools-and-utensils(1).png',
      title: `Rapidité`,
      text1: `Votre temps est pécieux, avec Winwez, vous supprimez les multiples rendez-vous interminables et sans intérêt.`,
      text2: `Winwez vous permet de vous concentrer que sur les déplacements essentiels chez les prestataires vérifiés et adaptés à vos besoins.`,
      },

      {icon: '/assets/icons/how-it-works/gestures(1).png',
      title: `Simplicité`,
      text1: `Comparez et adaptez instantanément les services selon votre budget.`,
      text2: `Bénéficiez de conseils, d’accompagnement et de suivi à chaque étape de l’organisation de votre mariage et jusqu’à la réalisation complète des missions par les prestataires.`,
      },

      {icon: '/assets/icons/how-it-works/weapons.png',
      title: `Sécurité`,
      text1: `Protégez vos règlements, évitez les pièges, escroqueries et faux prestataires.`,
      text2: `Réservez sur Winwez et profitez d’une assurance inclus qui garanti vos paiements et vos reservations.`,
      },
    ];
    this.title = this.isBecomePartner ? `Pourquoi devenir partenaire Winwez ?` : `Comment ça marche ?`;
  }

}
