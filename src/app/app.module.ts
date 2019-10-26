import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SystelabTranslateModule } from './systelab-translate/systelab-translate.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports:      [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		SystelabTranslateModule
	],
	providers:    [],
	bootstrap:    [AppComponent]
})
export class AppModule {
}

export { AppComponent } from './app.component';
