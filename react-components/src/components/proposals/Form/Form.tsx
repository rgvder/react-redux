import React, { ChangeEvent, Component, SyntheticEvent } from 'react';
import { Proposal } from '../../../models/Proposal.interface';

import styles from './Form.module.scss';
import { FormProps } from '../../../models/Form.interface';

class Form extends Component<FormProps, Proposal> {
  public nameInput: React.RefObject<HTMLInputElement> | null;
  public dateInput: React.RefObject<HTMLInputElement> | null;
  public emailInput: React.RefObject<HTMLInputElement> | null;
  public priceInput: React.RefObject<HTMLInputElement> | null;
  public imageInput: React.RefObject<HTMLInputElement> | null;
  public suctionPowerInput: React.RefObject<HTMLInputElement> | null;
  public cleaningTypeInput: React.RefObject<HTMLFieldSetElement> | null;
  public colorInput: React.RefObject<HTMLFieldSetElement> | null;
  public deliverySelect: React.RefObject<HTMLSelectElement> | null;

  constructor(props: FormProps) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // this.state = {
    //   name: '',
    //   dateOfBirth: '',
    //   image: '',
    //   email: '',
    //   deliveryTerm: undefined,
    //   color: [],
    //   price: undefined,
    //   suctionPower: undefined,
    //   cleaningType: undefined,
    //   disabledButton: true,
    // };

    this.nameInput = React.createRef();
    this.dateInput = React.createRef();
    this.emailInput = React.createRef();
    this.priceInput = React.createRef();
    this.imageInput = React.createRef();
    this.suctionPowerInput = React.createRef();
    this.cleaningTypeInput = React.createRef();
    this.colorInput = React.createRef();
    this.deliverySelect = React.createRef();
  }

  handleChange() {
    //   | ChangeEvent<HTMLFieldSetElement> //   | ChangeEvent<HTMLSelectElement> //   | ChangeEvent<HTMLInputElement> // event:
  }

  handleSubmit(event: SyntheticEvent) {
    const proposal: Proposal = {
      name: this.nameInput?.current?.value ?? '',
      dateOfBirth: this.dateInput?.current?.value ?? '',
      image: this.imageInput?.current?.value ?? '',
      email: this.emailInput?.current?.value ?? '',
      deliveryTerm:
        (this.deliverySelect?.current?.value as 'Very fast' | 'Fast' | 'Not mentioned') ??
        'Not mentioned',
      color: Array.from(
        this.colorInput?.current?.elements as HTMLCollectionOf<HTMLInputElement>
      ).reduce((colorArr: string[], input: HTMLInputElement) => {
        if (input.checked) {
          colorArr.push(input.name.toString());
        }
        return colorArr;
      }, []),
      price: this.priceInput?.current?.value ?? '',
      suctionPower: this.suctionPowerInput?.current?.value ?? '',
      cleaningType:
        Array.from(
          this.cleaningTypeInput?.current?.elements as HTMLCollectionOf<HTMLInputElement>
        ).reduce((value: string | undefined, input: HTMLInputElement) => {
          if (input.checked) {
            value += input.value;
          }
          return value;
        }, '') ?? '',
    };

    alert('Info is saved');
    event.preventDefault();

    this.props.addProposal(proposal);
  }

  render() {
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <label className={styles.text}>
          Name:
          <input className={styles['input-text']} ref={this.nameInput} type="text" name="name" />
        </label>
        <label className={styles.text}>
          Date of birth:
          <input ref={this.dateInput} type="date" name="date" />
        </label>
        <label className={styles.text}>
          Email:
          <input className={styles['input-text']} ref={this.emailInput} type="email" name="email" />
        </label>
        <label className={styles.text}>
          Price limit in rub:
          <input ref={this.priceInput} type="number" name="price" />
        </label>
        <label className={styles.text}>
          Suction power in watts:
          <input ref={this.suctionPowerInput} type="number" name="suctionPower" />
        </label>
        <fieldset ref={this.cleaningTypeInput}>
          <legend className={styles.text}>Cleaning type:</legend>
          <div>
            <label>
              dry
              <input type="radio" value="dry" name="cleaningType" />
            </label>
            <label>
              dry and wet
              <input type="radio" value="dry and wet" name="cleaningType" />
            </label>
          </div>
        </fieldset>
        <fieldset ref={this.colorInput}>
          <legend className={styles.text}>Color:</legend>
          <div>
            <label>
              black
              <input type="checkbox" name="black" />
            </label>
            <label>
              red
              <input type="checkbox" name="red" />
            </label>
          </div>
        </fieldset>

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
          <label className={styles.text}>Upload sample product please</label>
          <input ref={this.imageInput} type="file" />
        </fieldset>

        <input type="submit" value="Send" />
      </form>
    );
  }
}

export default Form;
