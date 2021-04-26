import React, { useState, PureComponent } from 'react';
import {Link} from 'react-router-dom';
import { useTranslation } from "react-i18next";
import PostDataCountries from '../../helpers/PostDataCountries';
import {getCitiesList, getNationList} from "../../helpers/DataAccess"

let $ = window.$;


class SelectPicker extends PureComponent {
  constructor(props) {
    super (props)
    let country = getNationList();
    let nation = country[0].countryId;
    if (props.national) {
      let na = country.filter(item => item.countryId == props.national);
      if(na) {
        nation = na[0].countryId
      }
    }
    let city = getCitiesList(nation);
    console.log(props.area, city, 145)
    this.state = {
      countries: country,
      national: props.national,
      area: props.area,
      areas: city
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
    let valueNational = e.target.value;
    let city =  getCitiesList(valueNational);
    let valueArea = city[0].countryName;
    this.setState({
      national: e.target.value,
      areas: city,
      area: valueArea
    }, () => {
      $(`.selectpicker.${this.props.areaName}`).selectpicker('refresh');
      $(`.selectpicker.${this.props.areaName}`).selectpicker('val', valueArea);
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
      areaTitle,
      page
    } = this.props;
    if (page === 'JOB_POST') {
      return <>
        <div className="col-sm-12 select-container margin-bottom-10">
          <div className="title">
            {nationalTitle}
          </div>
          <select className={`selectpicker ${nationalName}`} name={nationalName} data-live-search="true" onChange={this.handleChangeNational}>
            {
              this.state.countries.map((item, index) => {
                return <option key={index} value={item.countryId}>{item.countryName}</option>
              })
            }
          </select>
        </div>
        <div className="col-sm-12 select-container margin-bottom-10">
          <div className="title">
            {areaTitle}
          </div>
          <select className={`selectpicker ${areaName}`} name={areaName} data-live-search="true" onChange={this.handleChangeArea}>
            {
              this.state.areas.map((item, index) => {
                return <option key={index} value={item.countryName}>{item.countryName}</option>
              })
            }
          </select>
        </div>
      </>
    } else {
      return <>
        <div className="col-xl-6">
          <div className="submit-field">
            <h5>{nationalTitle}</h5>
            <select className={`selectpicker ${nationalName}`} name={nationalName} data-live-search="true" onChange={this.handleChangeNational}>
              {
                this.state.countries.map((item, index) => {
                  return <option key={index} value={item.countryId}>{item.countryName}</option>
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
                  return <option key={index} value={item.countryName}>{item.countryName}</option>
                })
              }
            </select>
          </div>
        </div>
      </>
    }
  }
}

export default SelectPicker;
