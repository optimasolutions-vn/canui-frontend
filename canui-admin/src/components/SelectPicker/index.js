import React, { useState, PureComponent } from 'react';
import {Link} from 'react-router-dom';
import { useTranslation } from "react-i18next";
import PostDataCountries from '../../helpers/PostDataCountries';
let $ = window.$;

class SelectPicker extends PureComponent {
  constructor(props) {
    super (props);
    let index =   PostDataCountries.countries.map((item, index) => {
      return item.code
    }).indexOf(props.national);
    if (index === -1) {
      index = 0
    }
    this.state = {
      national: props.national,
      area: props.area,
      areas: PostDataCountries.countries[index].area
    }
  }
  componentDidMount () {
    $(`.selectpicker.${this.props.nationalName}`).selectpicker('val', this.props.national);
    $(`.selectpicker.${this.props.areaName}`).selectpicker('val', this.props.area)
  }
  handleChangeNational = (e) => {
    let {
      nationalName,
      areaName
    } = this.props;
    let index =   PostDataCountries.countries.map((item, index) => {
      return item.code
    }).indexOf(e.target.value);
    let valueNational = e.target.value;
    let valueArea = PostDataCountries.countries[index].area[0].code;
    this.setState({
      national: e.target.value,
      areas: PostDataCountries.countries[index].area,
      area: PostDataCountries.countries[index].area[0].code
    }, () => {
      $(`.selectpicker.${this.props.areaName}`).selectpicker('refresh');
      $(`.selectpicker.${this.props.areaName}`).selectpicker('val', PostDataCountries.countries[index].area[0].code);
      this.props.callback({
        [nationalName]: valueNational,
        [areaName]: valueArea
      })
    })
  };
  handleChangeArea = (e) => {
    let {
      areaName
    } = this.props;
    let area= e.target.value;
    this.setState({
      area: area
    }, () => {
      this.props.callback({
        [areaName]: area
      })
    })
  }
  render () {
    let {
      nationalName,
      areaName,
      nationalTitle,
      areaTitle
    } = this.props;
    return <>
    <div className="col-xl-6">
      <div className="submit-field">
        <h5>{nationalTitle}</h5>
        <select className={`selectpicker ${nationalName}`} name={nationalName} data-live-search="true" onChange={this.handleChangeNational}>
          {
            PostDataCountries.countries.map((item, index) => {
              return <option key={index} value={item.code}>{item.name}</option>
            })
          }
        </select>
      </div>
    </div>
    <div className="col-xl-6">
      <div className="submit-field">
        <h5>{areaTitle}</h5>
        <select className={`selectpicker ${areaName}`} name={areaName} data-live-search="true" onChange={this.handleChangeArea}>
          {
            this.state.areas.map((item, index) => {
              return <option key={index} value={item.code}>{item.name}</option>
            })
          }
        </select>
      </div>
    </div>
    </>
  }
}

export default SelectPicker;
