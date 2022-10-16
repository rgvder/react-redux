import React, { ChangeEvent, Component, SyntheticEvent } from 'react';
import { Proposal } from '../../../models/Proposal.interface';

import styles from './Form.module.scss';
import { FormProps, FormState } from '../../../models/Form.interface';

class Form extends Component<FormProps, FormState> {
  public nameInput: React.RefObject<HTMLInputElement> | null;
  public dateInput: React.RefObject<HTMLInputElement> | null;
  public emailInput: React.RefObject<HTMLInputElement> | null;
  public priceInput: React.RefObject<HTMLInputElement> | null;
  public imageInput: React.RefObject<HTMLInputElement> | null;
  public submitInput: React.RefObject<HTMLInputElement> | null;
  public suctionPowerInput: React.RefObject<HTMLInputElement> | null;
  public cleaningTypeInput: React.RefObject<HTMLFieldSetElement> | null;
  public colorInput: React.RefObject<HTMLFieldSetElement> | null;
  public deliverySelect: React.RefObject<HTMLSelectElement> | null;

  constructor(props: FormProps) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.nameInput = React.createRef();
    this.dateInput = React.createRef();
    this.emailInput = React.createRef();
    this.priceInput = React.createRef();
    this.imageInput = React.createRef();
    this.submitInput = React.createRef();
    this.suctionPowerInput = React.createRef();
    this.cleaningTypeInput = React.createRef();
    this.colorInput = React.createRef();
    this.deliverySelect = React.createRef();

    this.state = {
      name: true,
      dateOfBirth: true,
      email: true,
      color: true,
      price: true,
      suctionPower: true,
      cleaningType: true,
      image: true,
    };
  }

  private selectColors() {
    return Array.from(
      this.colorInput?.current?.elements as HTMLCollectionOf<HTMLInputElement>
    ).reduce((colorArr: string[], input: HTMLInputElement) => {
      if (input.checked) {
        colorArr.push(input.name.toString());
      }
      return colorArr;
    }, []);
  }

  private selectCleaningType() {
    return Array.from(
      this.cleaningTypeInput?.current?.elements as HTMLCollectionOf<HTMLInputElement>
    ).reduce((value: string | undefined, input: HTMLInputElement) => {
      if (input.checked) {
        value += input.value;
      }
      return value;
    }, '');
  }

  toggleSubmit(state: FormState) {
    const hasInputValues: boolean = [
      this.nameInput?.current?.value,
      this.dateInput?.current?.value,
      this.imageInput?.current?.value,
      this.emailInput?.current?.value,
      this.selectColors().length,
      this.priceInput?.current?.value,
      this.suctionPowerInput?.current?.value,
      this.selectCleaningType(),
    ].some(Boolean);

    if (this.submitInput?.current) {
      this.submitInput.current.disabled = !hasInputValues || !Object.values(state).every(Boolean);
    }
  }

  isInputValid(input: React.RefObject<HTMLInputElement> | null, minLength = 0) {
    if (!input?.current?.value) {
      return false;
    }

    return input.current.value.trim().length >= minLength;
  }

  isEmailValid(input: React.RefObject<HTMLInputElement> | null) {
    if (!input?.current?.value) {
      return false;
    }

    return RegExp(
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
    ).test(input?.current?.value);
  }

  isFieldSetValid(fieldSetInput: string[] | string | undefined) {
    if (!fieldSetInput) {
      return false;
    }

    return !!fieldSetInput.length;
  }

  addImage(input: React.RefObject<HTMLInputElement> | null) {
    if (!input?.current?.files?.[0]) {
      return null;
    }

    return URL.createObjectURL(input?.current?.files[0]);
  }

  validate() {
    const currentState: FormState = {
      name: this.isInputValid(this.nameInput, 2),
      dateOfBirth: this.isInputValid(this.dateInput),
      email: this.isInputValid(this.emailInput, 4) && this.isEmailValid(this.emailInput),
      price: this.isInputValid(this.priceInput),
      color: this.isFieldSetValid(this.selectColors()),
      suctionPower: this.isInputValid(this.suctionPowerInput),
      cleaningType: this.isFieldSetValid(this.selectCleaningType()),
      image: !!this.addImage(this.imageInput),
    };

    this.setState(currentState);
    this.toggleSubmit(currentState);

    return Object.values(currentState).every(Boolean);
  }

  resetInputValue(input: React.RefObject<HTMLInputElement> | null) {
    if (!input?.current?.value) {
      return;
    }

    input.current.value = '';
  }

  resetFieldSet(elements: HTMLCollectionOf<HTMLInputElement> | null) {
    if (elements === null) {
      return;
    }

    if (elements) {
      for (const element of elements) {
        element.checked = false;
      }
    }
  }

  handleUserInput(event: ChangeEvent) {
    const name: string = (event.target as HTMLInputElement).name;
    const isColors: boolean = ['black', 'white', 'blue', 'red', 'grey'].includes(name);
    const newState: FormState = {
      ...this.state,
      [isColors ? 'color' : name]: true,
    };

    this.setState(newState);

    this.toggleSubmit(newState);
  }

  handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    const proposal: Proposal = {
      name: this.nameInput?.current?.value.trim() ?? '',
      dateOfBirth: this.dateInput?.current?.value ?? '',
      image: this.addImage(this.imageInput) ?? '',
      email: this.emailInput?.current?.value ?? '',
      deliveryTerm:
        (this.deliverySelect?.current?.value as 'Very fast' | 'Fast' | 'Not mentioned') ??
        'Not mentioned',
      color: this.selectColors(),
      price: this.priceInput?.current?.value ?? '',
      suctionPower: this.suctionPowerInput?.current?.value ?? '',
      cleaningType: this.selectCleaningType() ?? '',
    };

    if (this.validate()) {
      alert('Info is saved');
      this.props.addProposal(proposal);

      this.resetInputValue(this.nameInput);
      this.resetInputValue(this.dateInput);
      this.resetInputValue(this.emailInput);
      this.resetInputValue(this.priceInput);
      this.resetInputValue(this.imageInput);
      this.resetInputValue(this.suctionPowerInput);

      this.resetFieldSet(this.colorInput?.current?.elements as HTMLCollectionOf<HTMLInputElement>);
      this.resetFieldSet(
        this.cleaningTypeInput?.current?.elements as HTMLCollectionOf<HTMLInputElement>
      );

      if (this.deliverySelect?.current?.value) {
        this.deliverySelect.current.value = 'Not mentioned';
      }
      if (this.submitInput?.current) {
        this.submitInput.current.disabled = true;
      }
    }
  }

  render() {
    const addErrorMes: (str: string) => JSX.Element = (str: string) => (
      <div className={styles.error}>{str}</div>
    );

    const errorText = '* The field is required.';

    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <label className={`${styles.label} ${styles.text}`}>
          Name:
          <input
            className={styles.input}
            ref={this.nameInput}
            onChange={this.handleUserInput.bind(this)}
            type="text"
            name="name"
            autoComplete="off"
          />
        </label>
        {addErrorMes(this.state.name ? '' : `${errorText} Name must contain more than 2 letters.`)}
        <label className={`${styles.label} ${styles.text}`}>
          Date of birth:
          <input
            ref={this.dateInput}
            onChange={this.handleUserInput.bind(this)}
            className={styles.input}
            type="date"
            name="dateOfBirth"
            max="2004-01-01"
          />
        </label>
        {addErrorMes(this.state.dateOfBirth ? '' : errorText)}
        <label className={`${styles.label} ${styles.text}`}>
          Email:
          <input
            className={styles.input}
            ref={this.emailInput}
            onChange={this.handleUserInput.bind(this)}
            type="text"
            name="email"
            autoComplete="off"
          />
        </label>
        {addErrorMes(
          this.state.email ? '' : `${errorText} The data you entered is not in the right format.`
        )}
        <label className={`${styles.label} ${styles.text}`}>
          Price limit in rub:
          <input
            className={styles.input}
            ref={this.priceInput}
            onChange={this.handleUserInput.bind(this)}
            type="number"
            name="price"
          />
        </label>
        {addErrorMes(this.state.price ? '' : errorText)}
        <label className={`${styles.label} ${styles.text}`}>
          Suction power in watts:
          <input
            className={styles.input}
            ref={this.suctionPowerInput}
            onChange={this.handleUserInput.bind(this)}
            type="number"
            name="suctionPower"
          />
        </label>
        {addErrorMes(this.state.suctionPower ? '' : errorText)}
        <fieldset ref={this.cleaningTypeInput}>
          <legend className={`${styles.legend} ${styles.text}`}>Cleaning type:</legend>
          <div className={styles.wrapper}>
            <label className={styles.label}>
              <input
                type="radio"
                value="dry"
                onChange={this.handleUserInput.bind(this)}
                name="cleaningType"
              />
              dry
            </label>
            <label className={styles.label}>
              <input
                type="radio"
                value="dry and wet"
                onChange={this.handleUserInput.bind(this)}
                name="cleaningType"
              />
              dry and wet
            </label>
          </div>
        </fieldset>
        {addErrorMes(this.state.cleaningType ? '' : errorText)}
        <fieldset ref={this.colorInput}>
          <legend className={`${styles.legend} ${styles.text}`}>Color:</legend>
          <div className={styles.wrapper}>
            <label className={styles.label}>
              <input type="checkbox" name="black" onChange={this.handleUserInput.bind(this)} />
              black
            </label>
            <label className={styles.label}>
              <input type="checkbox" name="white" onChange={this.handleUserInput.bind(this)} />
              white
            </label>
            <label className={styles.label}>
              <input type="checkbox" name="blue" onChange={this.handleUserInput.bind(this)} />
              blue
            </label>
            <label className={styles.label}>
              <input type="checkbox" name="red" onChange={this.handleUserInput.bind(this)} />
              red
            </label>
            <label className={styles.label}>
              <input type="checkbox" name="grey" onChange={this.handleUserInput.bind(this)} />
              grey
            </label>
          </div>
        </fieldset>
        {addErrorMes(this.state.color ? '' : errorText)}

        <fieldset>
          <legend className={styles.text}>Delivery term:</legend>
          <select ref={this.deliverySelect} name="delivery">
            <option value="very fast">Very fast</option>
            <option value="fast">Fast</option>
            <option defaultValue="not mentioned" value="not mentioned">
              Not mentioned
            </option>
          </select>
        </fieldset>

        <fieldset>
          <label className={styles.text}>Upload sample product</label>
          <input
            ref={this.imageInput}
            onChange={this.handleUserInput.bind(this)}
            type="file"
            name="image"
          />
        </fieldset>
        {addErrorMes(this.state.image ? '' : errorText)}
        <input
          ref={this.submitInput}
          className="button button_filters"
          disabled
          type="submit"
          value="Send"
        />
      </form>
    );
  }
}

export default Form;
