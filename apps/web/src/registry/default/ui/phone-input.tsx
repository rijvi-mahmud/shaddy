'use client'
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { countries, lookup } from 'country-data-list'
import parsePhoneNumber from 'libphonenumber-js'
import { CircleFlag } from 'react-circle-flags'
import { cn } from '@/lib/utils'
import {
  CheckIcon,
  ChevronDown,
  ChevronsUpDown,
  Globe,
  GlobeIcon,
} from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

export type CountryData = (typeof countries.all)[number]

export interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onCountryChange?: (data: CountryData | undefined) => void
  value?: string
  onPhoneChange?: (phone: string) => void
  placeholder?: string
  defaultCountry?: keyof typeof CountryAlpha2
  className?: string
  inline?: boolean
  withCountryCodeSelector?: boolean
  disabled?: boolean
}

// --- Utility functions ---
function normalizePhone(value: string) {
  if (!value.startsWith('+')) {
    if (value.startsWith('00')) return '+' + value.slice(2)
    return '+' + value
  }
  return value
}

function getCountryCode(country: CountryData) {
  const code = country.countryCallingCodes[0] || ''
  return code.startsWith('+') ? code : `+${code}`
}

// --- Main PhoneInput component ---
export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      className,
      onCountryChange,
      onPhoneChange,
      value,
      placeholder = 'Enter your phone number',
      name,
      defaultCountry,
      inline = false,
      withCountryCodeSelector = true,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [data, setData] = useState<{
      code: string
      flag: string
      country: CountryData | undefined
      selectedCountry: CountryData | undefined
      hasInitialized: boolean
      phone: string
    }>({
      phone: value || '',
      code: '',
      flag: '',
      country: undefined,
      selectedCountry: undefined,
      hasInitialized: false,
    })

    // Memoize country options for dropdown
    const countryOptions = useMemo(
      () =>
        countries.all.filter(
          (country: CountryData) =>
            country.emoji &&
            country.status !== 'deleted' &&
            country.ioc !== 'PRK'
        ),
      []
    )

    // Initialize with defaultCountry
    useEffect(() => {
      if (!defaultCountry || !withCountryCodeSelector) return
      const newCountryData = lookup.countries({
        alpha2: CountryAlpha2[defaultCountry].toLowerCase(),
      })[0]
      if (!newCountryData) return

      setData((prev) => ({
        ...prev,
        code: getCountryCode(newCountryData),
        phone: getCountryCode(newCountryData),
        flag: newCountryData.alpha2.toLowerCase(),
        country: newCountryData,
        selectedCountry: newCountryData,
        hasInitialized: true,
      }))

      if (!value) {
        onPhoneChange?.(getCountryCode(newCountryData))
      }
    }, [defaultCountry, onPhoneChange, value])

    // Handle country dropdown change
    const handleCountryDropdownChange = useCallback(
      (country: CountryData) => {
        const code = getCountryCode(country)
        setData((prev) => ({
          ...prev,
          flag: country.alpha2.toLowerCase(),
          country,
          selectedCountry: country,
          phone: code,
          code,
        }))
        onCountryChange?.(country)

        if (!value || !value.startsWith(code)) {
          onPhoneChange?.(code)
        }
      },
      [onCountryChange, onPhoneChange, value]
    )

    // Handle phone input change
    const handlePhoneChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = e.target.value

        if (!withCountryCodeSelector) {
          onPhoneChange?.(newValue)
          setData((prev) => ({
            ...prev,
            phone: newValue,
          }))
          return
        }

        if (data.selectedCountry) {
          const code = getCountryCode(data.selectedCountry)
          if (!newValue.startsWith(code)) {
            newValue = code + newValue.replace(/^\+?\d*/, '')
          }
        } else {
          newValue = normalizePhone(newValue)
        }

        try {
          const parsed = parsePhoneNumber(newValue)

          if (parsed && parsed.country) {
            const countryCode = parsed.country
            const countryInfo = lookup.countries({ alpha2: countryCode })[0]
            setData((prev) => ({
              ...prev,
              flag: countryCode.toLowerCase(),
              country: countryInfo,
              selectedCountry: countryInfo,
              phone: parsed.number,
            }))
            onCountryChange?.(countryInfo)
            onPhoneChange?.(parsed.number)
          } else {
            setData((prev) => ({
              ...prev,
              phone: newValue,
              flag: '',
              country: undefined,
              selectedCountry: undefined,
            }))
            onCountryChange?.(undefined)
            onPhoneChange?.(newValue)
          }
        } catch {
          setData((prev) => ({
            ...prev,
            phone: newValue,
            flag: '',
            country: undefined,
            selectedCountry: undefined,
          }))
          onCountryChange?.(undefined)
          onPhoneChange?.(newValue)
        }
      },
      [data.selectedCountry, onCountryChange, onPhoneChange]
    )

    const inputClasses = cn(
      'flex items-center gap-2 relative bg-transparent transition-colors text-base rounded-md border pl-3 h-9 disabled:opacity-50 disabled:cursor-not-allowed md:text-sm has-[input:focus]:outline-none has-[input:focus]:ring-1 has-[input:focus]:ring-ring [interpolate-size:allow-keywords]',
      inline && 'rounded-l-none w-full',
      className
    )

    if (withCountryCodeSelector) {
      return (
        <div className={cn('flex items-center w-full', className)}>
          <CountryDropdown
            disabled={disabled}
            onChange={handleCountryDropdownChange}
            defaultValue={
              data.selectedCountry?.alpha2 ||
              (defaultCountry ? CountryAlpha2[defaultCountry] : undefined)
            }
            className={cn(inputClasses, 'rounded-r-none border-r-0')}
            inline
            options={countryOptions}
          />
          <div className="flex-1">
            <div className="flex items-center w-full">
              <Input
                ref={ref}
                value={data.phone}
                onChange={handlePhoneChange}
                placeholder={placeholder}
                type="tel"
                autoComplete="tel"
                name={name}
                className={cn(
                  'h-9 rounded-l-none border-l-0 pl-3',
                  'flex w-full bg-transparent text-base transition-colors placeholder:text-muted-foreground outline-none py-1 leading-none md:text-sm [interpolate-size:allow-keywords]',
                  className
                )}
                disabled={disabled}
                {...props}
              />
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className={inputClasses}>
        {!inline && (
          <div className="w-4 h-4 rounded-full shrink-0">
            {data.flag ? (
              <CircleFlag countryCode={data.flag} height={16} />
            ) : (
              <GlobeIcon size={16} />
            )}
          </div>
        )}
        <Input
          ref={ref}
          value={data.phone}
          onChange={handlePhoneChange}
          placeholder={placeholder}
          type="tel"
          autoComplete="tel"
          name={name}
          className={cn(
            'flex w-full border-none bg-transparent text-base transition-colors placeholder:text-muted-foreground outline-none h-9 py-1 p-0 leading-none md:text-sm [interpolate-size:allow-keywords] focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent',
            className
          )}
          disabled={disabled}
          {...props}
        />
      </div>
    )
  }
)

PhoneInput.displayName = 'PhoneInput'

// --- CountryDropdown ---
type CountryDropdownProps = {
  options?: CountryData[]
  disabled?: boolean
  placeholder?: string
  slim?: boolean
  inline?: boolean
  className?: string
  onChange?: (country: CountryData) => void
  defaultValue?: string | keyof typeof CountryAlpha2
}

const CountryDropdownComponent = (
  {
    options = countries.all.filter(
      (country: CountryData) =>
        country.emoji && country.status !== 'deleted' && country.ioc !== 'PRK'
    ),
    onChange,
    defaultValue,
    disabled = false,
    placeholder = 'Select a country',
    slim = false,
    inline = false,
    className,
    ...props
  }: CountryDropdownProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  const [open, setOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<
    CountryData | undefined
  >()

  useEffect(() => {
    if (!defaultValue) {
      setSelectedCountry(undefined)
      return
    }
    if (typeof defaultValue === 'string') {
      const initialCountry = options.find(
        (country) => country.alpha2 === defaultValue
      )
      setSelectedCountry(initialCountry)
    }
  }, [defaultValue, options])

  const handleSelect = useCallback(
    (country: CountryData) => {
      setSelectedCountry(country)
      onChange?.(country)
      setOpen(false)
    },
    [onChange]
  )

  const triggerClasses = cn(
    'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border bg-transparent px-3 py-1 text-base transition-colors placeholder:text-muted-foreground outline-none md:text-sm [interpolate-size:allow-keywords]',
    slim === true && 'gap-1 w-min',
    inline && 'rounded-r-none border-r-0 gap-1 pr-1 w-min',
    className
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        ref={ref}
        className={triggerClasses}
        disabled={disabled}
        {...props}
      >
        {selectedCountry ? (
          <div className="flex items-center flex-grow gap-2 overflow-hidden">
            <div className="inline-flex items-center justify-center w-4 h-4 shrink-0 overflow-hidden rounded-full">
              <CircleFlag
                countryCode={selectedCountry.alpha2.toLowerCase() || ''}
                height={16}
              />
            </div>
            {slim === false && !inline && (
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                {selectedCountry.name}
              </span>
            )}
          </div>
        ) : (
          <span className="flex items-center gap-2">
            {inline || slim ? <Globe size={16} /> : placeholder}
          </span>
        )}

        {!inline ? (
          <ChevronDown size={16} />
        ) : (
          <ChevronsUpDown size={16} className="text-muted-foreground" />
        )}
      </PopoverTrigger>
      <PopoverContent
        collisionPadding={10}
        side="bottom"
        className="min-w-[--radix-popper-anchor-width] p-0"
      >
        <ScrollArea className="w-full max-h-[200px] sm:max-h-[270px]">
          <Command className="w-full">
            <CommandList>
              <div className="sticky top-0 z-10 bg-popover">
                <CommandInput placeholder="Search country..." />
              </div>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {options
                  .filter((country) => country.name)
                  .map((option, key) => (
                    <CommandItem
                      className="flex items-center w-full gap-2"
                      key={key}
                      onSelect={() => handleSelect(option)}
                    >
                      <div className="flex flex-grow space-x-2 overflow-hidden">
                        <div className="inline-flex items-center justify-center w-5 h-5 shrink-0 overflow-hidden rounded-full">
                          <CircleFlag
                            countryCode={option.alpha2.toLowerCase()}
                            height={20}
                          />
                        </div>
                        <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                          {option.name}
                        </span>
                      </div>
                      <CheckIcon
                        className={cn(
                          'ml-auto h-4 w-4 shrink-0',
                          selectedCountry?.name === option.name
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}

CountryDropdownComponent.displayName = 'CountryDropdownComponent'

export const CountryDropdown = forwardRef(CountryDropdownComponent)

export enum CountryAlpha2 {
  Ascension_Island = 'AC',
  Andorra = 'AD',
  United_Arab_Emirates = 'AE',
  Afghanistan = 'AF',
  Antigua_And_Barbuda = 'AG',
  Anguilla = 'AI',
  French_Afar_and_Issas = 'AI',
  Albania = 'AL',
  Armenia = 'AM',
  Netherlands_Antilles = 'AN',
  Angola = 'AO',
  Antarctica = 'AQ',
  Argentina = 'AR',
  American_Samoa = 'AS',
  Austria = 'AT',
  Australia = 'AU',
  Aruba = 'AW',
  Åland_Islands = 'AX',
  Azerbaijan = 'AZ',
  Bosnia_and_Herzegovina = 'BA',
  Barbados = 'BB',
  Bangladesh = 'BD',
  Belgium = 'BE',
  Burkina_Faso = 'BF',
  Bulgaria = 'BG',
  Bahrain = 'BH',
  Burundi = 'BI',
  Benin = 'BJ',
  Saint_Barthélemy = 'BL',
  Bermuda = 'BM',
  Brunei_Darussalam = 'BN',
  Bolivia_Plurinational_State_Of = 'BO',
  Bonaire_Sint_Eustatius_And_Saba = 'BQ',
  British_Antarctic_Territory = 'BQ',
  Brazil = 'BR',
  Bahamas = 'BS',
  Bhutan = 'BT',
  Bouvet_Island = 'BV',
  Botswana = 'BW',
  Belarus = 'BY',
  Byelorussian_SSR = 'BY',
  Belize = 'BZ',
  Canada = 'CA',
  Cocos_Keeling_Islands = 'CC',
  Democratic_Republic_Of_Congo = 'CD',
  Central_African_Republic = 'CF',
  Republic_Of_Congo = 'CG',
  Switzerland = 'CH',
  Côte_dIvoire = 'CI',
  Cook_Islands = 'CK',
  Chile = 'CL',
  Cameroon = 'CM',
  China = 'CN',
  Colombia = 'CO',
  Clipperton_Island = 'CP',
  Costa_Rica = 'CR',
  Czechoslovakia = 'CS',
  Serbia_and_Montenegro = 'CS',
  Canton_and_Enderbury_Islands = 'CT',
  Cuba = 'CU',
  Cabo_Verde = 'CV',
  Curacao = 'CW',
  Christmas_Island = 'CX',
  Cyprus = 'CY',
  Czech_Republic = 'CZ',
  German_Democratic_Republic = 'DD',
  Germany = 'DE',
  Diego_Garcia = 'DG',
  Djibouti = 'DJ',
  Denmark = 'DK',
  Dominica = 'DM',
  Dominican_Republic = 'DO',
  Dahomey = 'DY',
  Algeria = 'DZ',
  Ceuta_Mulilla = 'EA',
  Ecuador = 'EC',
  Estonia = 'EE',
  Egypt = 'EG',
  Western_Sahara = 'EH',
  Eritrea = 'ER',
  Spain = 'ES',
  Ethiopia = 'ET',
  European_Union = 'EU',
  Finland = 'FI',
  Fiji = 'FJ',
  Falkland_Islands = 'FK',
  Micronesia_Federated_States_Of = 'FM',
  Faroe_Islands = 'FO',
  France = 'FR',
  France_Metropolitan = 'FX',
  Gabon = 'GA',
  United_Kingdom = 'GB',
  Grenada = 'GD',
  Georgia = 'GE',
  Gilbert_and_Ellice_Islands = 'GE',
  French_Guiana = 'GF',
  Guernsey = 'GG',
  Ghana = 'GH',
  Gibraltar = 'GI',
  Greenland = 'GL',
  Gambia = 'GM',
  Guinea = 'GN',
  Guadeloupe = 'GP',
  Equatorial_Guinea = 'GQ',
  Greece = 'GR',
  South_Georgia_And_The_South_Sandwich_Islands = 'GS',
  Guatemala = 'GT',
  Guam = 'GU',
  Guinea_bissau = 'GW',
  Guyana = 'GY',
  Hong_Kong = 'HK',
  Heard_Island_And_McDonald_Islands = 'HM',
  Honduras = 'HN',
  Croatia = 'HR',
  Haiti = 'HT',
  Hungary = 'HU',
  Upper_Volta = 'HV',
  Canary_Islands = 'IC',
  Indonesia = 'ID',
  Ireland = 'IE',
  Israel = 'IL',
  Isle_Of_Man = 'IM',
  India = 'IN',
  British_Indian_Ocean_Territory = 'IO',
  Iraq = 'IQ',
  Iran_Islamic_Republic_Of = 'IR',
  Iceland = 'IS',
  Italy = 'IT',
  Jersey = 'JE',
  Jamaica = 'JM',
  Jordan = 'JO',
  Japan = 'JP',
  Johnston_Island = 'JT',
  Kenya = 'KE',
  Kyrgyzstan = 'KG',
  Cambodia = 'KH',
  Kiribati = 'KI',
  Comoros = 'KM',
  Saint_Kitts_And_Nevis = 'KN',
  Korea_Democratic_Peoples_Republic_Of = 'KP',
  Korea_Republic_Of = 'KR',
  Kuwait = 'KW',
  Cayman_Islands = 'KY',
  Kazakhstan = 'KZ',
  Lao_Peoples_Democratic_Republic = 'LA',
  Lebanon = 'LB',
  Saint_Lucia = 'LC',
  Liechtenstein = 'LI',
  Sri_Lanka = 'LK',
  Liberia = 'LR',
  Lesotho = 'LS',
  Lithuania = 'LT',
  Luxembourg = 'LU',
  Latvia = 'LV',
  Libya = 'LY',
  Morocco = 'MA',
  Monaco = 'MC',
  Moldova = 'MD',
  Montenegro = 'ME',
  Saint_Martin = 'MF',
  Madagascar = 'MG',
  Marshall_Islands = 'MH',
  Midway_Islands = 'MI',
  North_Macedonia = 'MK',
  Mali = 'ML',
  Myanmar = 'MM',
  Mongolia = 'MN',
  Macao = 'MO',
  Northern_Mariana_Islands = 'MP',
  Martinique = 'MQ',
  Mauritania = 'MR',
  Montserrat = 'MS',
  Malta = 'MT',
  Mauritius = 'MU',
  Maldives = 'MV',
  Malawi = 'MW',
  Mexico = 'MX',
  Malaysia = 'MY',
  Mozambique = 'MZ',
  Namibia = 'NA',
  New_Caledonia = 'NC',
  Niger = 'NE',
  Norfolk_Island = 'NF',
  Nigeria = 'NG',
  New_Hebrides = 'NH',
  Nicaragua = 'NI',
  Netherlands = 'NL',
  Norway = 'NO',
  Nepal = 'NP',
  Dronning_Maud_Land = 'NQ',
  Nauru = 'NR',
  Neutral_Zone = 'NT',
  Niue = 'NU',
  New_Zealand = 'NZ',
  Oman = 'OM',
  Panama = 'PA',
  Pacific_Islands_Trust_Territory_of_the = 'PC',
  Peru = 'PE',
  French_Polynesia = 'PF',
  Papua_New_Guinea = 'PG',
  Philippines = 'PH',
  Pakistan = 'PK',
  Poland = 'PL',
  Saint_Pierre_And_Miquelon = 'PM',
  Pitcairn = 'PN',
  Puerto_Rico = 'PR',
  Palestinian_Territory_Occupied = 'PS',
  Portugal = 'PT',
  US_Miscellaneous_Pacific_Islands = 'PU',
  Palau = 'PW',
  Paraguay = 'PY',
  Panama_Canal_Zone = 'PZ',
  Qatar = 'QA',
  Reunion = 'RE',
  Southern_Rhodesia = 'RH',
  Romania = 'RO',
  Serbia = 'RS',
  Russia = 'RU',
  Rwanda = 'RW',
  Saudi_Arabia = 'SA',
  Solomon_Islands = 'SB',
  Seychelles = 'SC',
  Sudan = 'SD',
  Sweden = 'SE',
  Singapore = 'SG',
  Saint_Helena_Ascension_And_Tristan_Da_Cunha = 'SH',
  Slovenia = 'SI',
  Svalbard_And_Jan_Mayen = 'SJ',
  Slovakia = 'SK',
  Sikkim = 'SK',
  Sierra_Leone = 'SL',
  San_Marino = 'SM',
  Senegal = 'SN',
  Somalia = 'SO',
  Suriname = 'SR',
  South_Sudan = 'SS',
  Sao_Tome_and_Principe = 'ST',
  USSR = 'SU',
  El_Salvador = 'SV',
  Sint_Maarten = 'SX',
  Syrian_Arab_Republic = 'SY',
  Eswatini = 'SZ',
  Tristan_de_Cunha = 'TA',
  Turks_And_Caicos_Islands = 'TC',
  Chad = 'TD',
  French_Southern_Territories = 'TF',
  Togo = 'TG',
  Thailand = 'TH',
  Tajikistan = 'TJ',
  Tokelau = 'TK',
  Timor_Leste_Democratic_Republic_of = 'TL',
  Turkmenistan = 'TM',
  Tunisia = 'TN',
  Tonga = 'TO',
  East_Timor = 'TP',
  Turkey = 'TR',
  Trinidad_And_Tobago = 'TT',
  Tuvalu = 'TV',
  Taiwan = 'TW',
  Tanzania_United_Republic_Of = 'TZ',
  Ukraine = 'UA',
  Uganda = 'UG',
  United_States_Minor_Outlying_Islands = 'UM',
  United_States = 'US',
  Uruguay = 'UY',
  Uzbekistan = 'UZ',
  Vatican_City_State = 'VA',
  Saint_Vincent_And_The_Grenadines = 'VC',
  Viet_Nam_Democratic_Republic_of = 'VD',
  Venezuela_Bolivarian_Republic_Of = 'VE',
  Virgin_Islands_British = 'VG',
  Virgin_Islands_US = 'VI',
  VietNam = 'VN',
  Vanuatu = 'VU',
  Wallis_And_Futuna = 'WF',
  Wake_Island = 'WK',
  Samoa = 'WS',
  Kosovo = 'XK',
  Yemen_Democratic = 'YD',
  Yemen = 'YE',
  Mayotte = 'YT',
  Yugoslavia = 'YU',
  South_Africa = 'ZA',
  Zambia = 'ZM',
  Zaire = 'ZR',
  Zimbabwe = 'ZW',
}
