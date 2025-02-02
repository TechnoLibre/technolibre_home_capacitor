import { CommonModule } from '@angular/common';
import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

type DataParam = {
  isDefined: WritableSignal<any>,
  value: WritableSignal<any>
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  formUsernameValue = "";
  formPasswordValue = "";

  usernameData: DataParam = {
    isDefined: signal(false),
    value: signal("")
  };

  passwordData: DataParam = {
    isDefined: signal(false),
    value: signal("")
  };

  async ngOnInit() {
    this.fetchUsernamePassword();
  }

  public async onSetDataSubmit(event: Event) {
    event.preventDefault();
    await this.setUsernamePassword();
    await this.fetchUsernamePassword();
    this.resetInputs();
  }

  private async fetchUsernamePassword() {
    try {
      const tempUsername = await SecureStoragePlugin.get({ key: "username" });
      this.setDataParam(this.usernameData, true, tempUsername.value);
    } catch (error) {
      this.setDataParam(this.usernameData, false, "");
    }

    try {
      const tempPassword = await SecureStoragePlugin.get({ key: "password" });
      this.setDataParam(this.passwordData, true, tempPassword.value);
    } catch (error) {
      this.setDataParam(this.passwordData, false, "");
    }
  }

  private async setUsernamePassword() {
    if (!this.formUsernameValue) {
      SecureStoragePlugin.set({ key: "username", value: "" });
    } else {
      SecureStoragePlugin.set({ key: "username", value: this.formUsernameValue });
    }

    if (!this.formPasswordValue) {
      SecureStoragePlugin.set({ key: "password", value: "" });
    } else {
      SecureStoragePlugin.set({ key: "password", value: this.formPasswordValue });
    }
  }

  private resetInputs() {
    this.formUsernameValue = "";
    this.formPasswordValue = "";
  }

  private setDataParam(object: DataParam, newIsDefined: boolean, newValue: string) {
    object.isDefined.set(newIsDefined);
    object.value.set(newValue);
  }

}
