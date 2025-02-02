import { CommonModule } from '@angular/common';
import { Component, OnInit, Signal, signal } from '@angular/core';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  usernameData = {
    isDefined: signal(false),
    value: signal("")
  };

  passwordData = {
    isDefined: signal(false),
    value: signal("")
  };

  async ngOnInit() {
    this.fetchUsernamePassword();
  }

  private async fetchUsernamePassword() {
    try {
      const tempUsername = await SecureStoragePlugin.get({ key: "username" });
      this.usernameData.isDefined.set(true);
      this.usernameData.value.set(tempUsername.value);
    } catch (error) {
      this.usernameData.isDefined.set(false);
      this.usernameData.value.set("");
    }

    try {
      const tempPassword = await SecureStoragePlugin.get({ key: "password" });
      this.passwordData.value.set(tempPassword.value);
    } catch (error) {
      this.passwordData.value.set("");
    }
  }

}
