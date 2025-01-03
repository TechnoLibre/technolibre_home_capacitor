import { Component } from '@angular/core';
import { Contacts, PhoneType, EmailType, PermissionStatus, CreateContactResult, ContactInput } from '@capacitor-community/contacts';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  onOpenWebsiteClick() {
    window.open("https://technolibre.ca/web/login", "_blank");
  }

  onAddContactClick() {
    Contacts.checkPermissions()
      .then((response: PermissionStatus) => {
        switch (response.contacts) {
          case "granted":
            this.addContact();
            break;
          case "prompt":
          case "prompt-with-rationale":
            this.requestContactPermissions();
            break;
          case "denied":
          default:
            break;
        }
      });
  }

  private addContact() {
    const contact: ContactInput = {
      name: {
        given: "Robot",
        family: "Libre"
      },
      phones: [
        {
          type: PhoneType.Work,
          label: "Compagnie",
          isPrimary: true,
          number: "514-999-9999"
        }
      ],
      emails: [
        {
          type: EmailType.Work,
          label: "Compagnie",
          isPrimary: true,
          address: "robotlibre@technolibre.ca"
        }
      ],
      urls: ["https://technolibre.ca/"],
      image: {
        base64String: "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"
      }
    };

    Contacts.createContact({ contact })
      .then((response: CreateContactResult) => {
        console.log(response);
      })
  }

  private requestContactPermissions() {
    Contacts.requestPermissions()
      .then((response: PermissionStatus) => {
        switch (response.contacts) {
          case "granted":
            this.addContact();
            break;
          default:
            break;
        }
      });
  }

}
