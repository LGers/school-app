import React from 'react';
import { Button, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import s from './Main.module.scss';
import { MAIN } from './Main.dictionary';
import { PATH } from '../../constants/common.dictionary';
import pencil from '../../assets/img/pencils.png';
import flower from '../../assets/img/flower-fill.svg';
import notes from '../../assets/img/notes.png';
import classes from '../../assets/img/classes.png';
import oneClass from '../../assets/img/one-class.png';
import addStudents from '../../assets/img/add-students.png';
import profile from '../../assets/img/profile.png';

const {
  TITLE, CRAWLER_INFO, CLASSES_INFO, ONE_CLASS_INFO, ADD_STUDENTS_INFO, PROFILE_INFO, BOTTOM_INFO,
  BUTTONS, TEXT,
} = MAIN;

export function Main() {
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <div className={s.headerWrapper}>
          <Header />
        </div>
      </div>
      <div className={s.contentWrapper}>
        <div className={s.mainWrapper}>
          <main className={s.mainContent}>
            <section className={s.mainSectionTitle}>
              <div className={s.mainTitleContainer}>
                <div>
                  <h1 className={s.mainTitle}>{TITLE.T1}</h1>
                  <h1 className={s.mainTitle}>{TITLE.T2}</h1>
                </div>
                <Link to={PATH.SIGN_UP}>
                  <Button type="primary" size="large">{BUTTONS.SIGN_UP1}</Button>
                </Link>
              </div>
              <div className={s.mainFirstImage}>
                <img className={s.mainFirstImageImg} src={pencil} alt="Pencils" />
                <img className={s.mainFirstImageFlower} src={flower} alt="Flower" />
              </div>
            </section>

            <section className={s.infoSection}>
              <p className={s.preTitle}>
                {CRAWLER_INFO.T1}
              </p>
              <Divider />
              <h2>{CRAWLER_INFO.T2}</h2>
              <div className={s.sectionRow}>
                <div className={s.sectionCol}>
                  <div className={s.sectionDescription}>
                    {CRAWLER_INFO.DESCRIPTION}
                  </div>
                </div>
                <div className={s.sectionCol}>
                  <img className={s.sectionImg} src={notes} alt="Notes" />
                </div>
              </div>
            </section>

            <section className={s.infoSection}>
              <p className={s.preTitle}>
                {CLASSES_INFO.T1}
              </p>
              <Divider />
              <h2>{CLASSES_INFO.T2}</h2>
              <div className={s.sectionRow}>
                <div className={s.sectionCol}>
                  <img className={s.sectionImg} src={classes} alt="Classes" />
                </div>
                <div className={s.sectionCol}>
                  <div className={s.sectionDescription}>
                    {CLASSES_INFO.DESCRIPTION}
                  </div>
                </div>
              </div>
            </section>

            <section className={s.infoSection}>
              <p className={s.preTitle}>
                {ONE_CLASS_INFO.T1}
              </p>
              <Divider />
              <h2>{ONE_CLASS_INFO.T2}</h2>
              <div className={s.sectionRow}>
                <div className={s.sectionCol}>
                  <div className={s.sectionDescription}>
                    {ONE_CLASS_INFO.DESCRIPTION}
                  </div>
                </div>
                <div className={s.sectionCol}>
                  <img className={s.sectionImg} src={oneClass} alt="One class" />
                </div>
              </div>
            </section>

            <section className={s.infoSection}>
              <p className={s.preTitle}>
                {ADD_STUDENTS_INFO.T1}
              </p>
              <Divider />
              <h2>{ADD_STUDENTS_INFO.T2}</h2>
              <div className={s.sectionRow}>
                <div className={s.sectionCol}>
                  <img className={s.sectionImg} src={addStudents} alt="Add students" />
                </div>
                <div className={s.sectionCol}>
                  <div className={s.sectionDescription}>
                    {ADD_STUDENTS_INFO.DESCRIPTION}
                  </div>
                </div>
              </div>
            </section>

            <section className={s.infoSection}>
              <p className={s.preTitle}>
                {PROFILE_INFO.T1}
              </p>
              <Divider />
              <h2>{PROFILE_INFO.T2}</h2>
              <div className={s.sectionRow}>
                <div className={s.sectionCol}>
                  <div className={s.sectionDescription}>
                    {PROFILE_INFO.DESCRIPTION}
                  </div>
                </div>
                <div className={s.sectionCol}>
                  <img className={s.sectionImg} src={profile} alt="Profile" />
                </div>
              </div>
            </section>

            <section className={s.bottomSection}>
              <p className={s.preTitle}>
                {BOTTOM_INFO.T1}
              </p>
              <Divider />
              <div className={s.sectionButtons}>
                <Link to={PATH.SIGN_IN}>
                  <Button type="primary">{BUTTONS.SIGN_IN}</Button>
                </Link>
                <div>{TEXT.OR}</div>
                <Link to={PATH.SIGN_UP}>
                  <Button>{BUTTONS.SIGN_UP}</Button>
                </Link>
              </div>
            </section>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
