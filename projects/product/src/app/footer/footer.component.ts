import { Component } from '@angular/core';
import { faFacebook,faInstagram,faYoutube,faXTwitter,faLinkedin} from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
faFacebook=faFacebook;
faInstagram=faInstagram;
faYoutube=faYoutube;
faTwitter=faXTwitter;
faLinkedIn=faLinkedin;
}
