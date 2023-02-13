import ListTable from "../ListTable/ListTable";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEntity } from "../../../../api";
import buttonItemObj from "../../AllFakeData/asidButton";
import headerListObj from "../../AllFakeData/headerList";
import ButtonItem from "./ButtonItem";
import HeaderList from "./HeaderList";
import squares from "../../../../assets/squares.png";
import arrow from "../../../../assets/arrow.png";
import downArrow from "../../../../assets/downArrow.png";
import { DefaultMyState } from "../../../../types";
import "./TableComponent.scss";

const TableComponent = () => {
  const dispatch = useDispatch();
  const eID = useSelector((state: DefaultMyState) => state.eID.eID);

  React.useEffect(() => {
    dispatch(createEntity());
  }, [dispatch]);

  return (
    eID && (
      <div className="wrapper">
        <div className="wrap">
          <header className="header__wrap">
            <div className="header">
              <img src={squares} alt="icon_squares" />
              <img src={arrow} alt="icon_arrow" />
              <p className="active">Просмотр</p>
              <p>Управление</p>
            </div>
          </header>
          <div className="table">
            <section className="tableAsid__wrap">
              <div className="tableAsid__header">
                <div className="tableAsid__title">
                  <p>Название проекта</p>
                  <p className="small">Аббревиатура</p>
                </div>
                <img src={downArrow} alt="icon_downArrow" />
              </div>
              <ul className="tableAsid__button">
                {!!buttonItemObj &&
                  buttonItemObj.map((item) => {
                    return (
                      <ButtonItem
                        title={item.title}
                        key={item.id}
                        src={item.src}
                        alt={item.alt}
                        id={item.id}
                      />
                    );
                  })}
              </ul>
            </section>
            <section className="tableList__wrap">
              <div className="tableList__title">
                <p>Строительно-монтажные работы</p>
              </div>
              <ul className="tableList__header">
                {!!headerListObj &&
                  headerListObj.map((item) => {
                    return <HeaderList title={item.title} key={item.id} />;
                  })}
              </ul>
              <ListTable eID={eID} />
            </section>
          </div>
        </div>
      </div>
    )
  );
};

export default TableComponent;
