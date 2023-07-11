"use client";
import React from "react";
import { CustomCamera } from "../about/page";
import Experience from "../components/Experience";
import styles from "../about/styles.module.scss";
import { Canvas } from "@react-three/fiber";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faWhatsapp,
  faLinkedin,
  faGithub,
  faGitlab,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";

export default function Page() {
  return (
    <div>
      <div className={styles.main}>
        <div className={styles.content}>
          <div>
            <h2>Contact.</h2>
          </div>

          <div className={styles.text__section}>
            <h3> Links </h3>
            <p>How can I help you?</p>
          </div>
          <div className={styles.links__container}>
            <ul>
              <li>
                <a href="#">
                  <FontAwesomeIcon className={styles.fa} icon={faInstagram} />
                  <span> - Instagram</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <FontAwesomeIcon className={styles.fa} icon={faWhatsapp} />
                  <span> - WhatsApp</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <FontAwesomeIcon className={styles.fa} icon={faLinkedin} />
                  <span> - LinkedIn</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <FontAwesomeIcon className={styles.fa} icon={faGithub} />
                  <span> - GitHub</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <FontAwesomeIcon className={styles.fa} icon={faGitlab} />
                  <span> - GitLab</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <FontAwesomeIcon className={styles.fa} icon={faGoogle} />
                  <span> - Email</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.avatar__bye}>
          <Canvas>
            <CustomCamera />
            <Experience page={"contact"} />
          </Canvas>
        </div>
      </div>
    </div>
  );
}
