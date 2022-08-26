import { OnInit, EventEmitter } from '@angular/core';
import { CountryCode } from './resource/country-code';
import { Country } from './model/country.model';
export declare class NgxIntlTelInputComponent implements OnInit {
    private countryCodeData;
    value: string;
    preferredCountries: Array<string>;
    valueChange: EventEmitter<string>;
    phone_number: string;
    allCountries: Array<Country>;
    preferredCountriesInDropDown: Array<Country>;
    selectedCountry: Country;
    constructor(countryCodeData: CountryCode);
    ngOnInit(): void;
    onPhoneNumberChange(): void;
    onCountrySelect(country: Country, el: any): void;
    onInputKeyPress(event: any): void;
    protected fetchCountryData(): void;
    protected getPhoneNumberPlaceHolder(countryCode: string): string;
}
