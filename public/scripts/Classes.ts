
let map = {
  required: 'Ce champs est obligatoire',
  linkImage: {
    link: 'Le lien de l\'illustration doit être valide',
    image: 'Le lien de l\'illustration doit renvoyer une image'
  },
  number: {
    number: 'Ce champs doit être un nombre'
  },
  email: {
    email: 'Ce champs doit être une adresse valide'
  },
  time: {
    time: 'L\'heure doit être valide'
  },
  date: {
    date: 'La date doit être valide'
  },
  dateBetween: {
    start: 'La date de début doit être dans le futur',
    end: 'La date de fin doit être après la date de début'
  },
}


class textForm{
  public placeholder:string;
  public name:string;
  public type:string;
  public required:boolean;
  public legend:string;
  public source:string;
  public init:string;
  public validator:string;
  public error:boolean;
  public errors:string[];
  public errorMessage:string;

  constructor(placeholder: string, name: string, type: string, required: boolean, legend: string, source :string, init: string, validator: string, error: boolean, errorMessage: string){
    this.placeholder = placeholder;
    this.name = name;
    this.type = type;
    this.required = required;
    if (legend) {this.legend = legend}
    if (source) {this.source = source}
    if (init != null) {this.init = init}
    if (validator) {this.validator = validator}
    if(error){
      this.errors = [];
      if(validator){
        this.errors = map[validator];
      }
      if(required){this.errors["required"] = errorMessage?errorMessage:map.required}
    }
  }
}

class searchForm{
  public placeholder:string;
  public name:string;
  public required:boolean;
  public legend:string;
  public source:string;
  public validator:string;
  public error:boolean;
  public errors:string[];
  public errorMessage:string;

  constructor(placeholder: string, name: string, required: boolean, legend: string, source :string, validator: string, error: boolean, errorMessage: string){
    this.placeholder = placeholder;
    this.name = name;
    this.required = required;
    if (legend) {this.legend = legend}
    if (source) {this.source = source}
    if (validator) {this.validator = validator}
    if(error){
      this.errors = [];
      if(validator){
        this.errors = map[validator];
      }
      if(required){this.errors["required"] = errorMessage?errorMessage:map.required}
    }
  }
}

class ratingForm{
  public name:string;
  public required:boolean;
  public source:string;
  public editable: boolean;
  public init: string;

  constructor(name:string, required: boolean, init:string, editable:boolean){
    this.name = name;
    this.editable = editable;
    this.required = required;
    if (init != null) {this.init = init}
  }
}


class dateBetweenForm{
  
  public startName: string;
  public endName: string;
  public legend1: string;
  public legend2: string;
  public required: boolean;
  public validator: string;
  public errors: string[];

  constructor(startName: string, endName: string, legend1: string, legend2: string, required: boolean, error:boolean, errorMessage: string){
    this.startName = startName;
    this.endName = endName;
    this.legend1 = legend1;
    this.legend2 = legend2;
    this.required = required;
    this.validator = 'dateBetween';
    if(error){
      this.errors = [];
      this.errors = map[this.validator];
      if(required){this.errors["required"] = errorMessage?errorMessage:map.required}
    }
  }
}


class Notif{
  public type: string;
  public message: string;
  public date: Date;
  
  constructor(type: string, message: string, date: Date){
    this.type = type;
    this.message = message;
    this.date = date;
  }
}
