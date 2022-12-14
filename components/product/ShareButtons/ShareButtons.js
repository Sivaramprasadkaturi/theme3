import React, { useState, useEffect } from "react";
import {
  TwitterShareButton,
  FacebookShareButton,
  EmailShareButton,
  LineShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  WhatsappShareButton,
  TwitterIcon,
  FacebookIcon,
  EmailIcon,
  LineIcon,
  LinkedinIcon,
  PinterestIcon,
  WhatsappIcon
} from "react-share";
import { useRouter } from "next/router";

import classes from "./Styles/ShareButtons.module.css";

const BUTTON_SIZE = 40;

const ShareButtons = props => {
  const router = useRouter();

  const { title, imageUrl } = props;
  const [productUrl, setProductUrl] = useState(router.asPath);

  return (
    <div className={classes.wrapper}>
      <EmailShareButton
        separator={" "}
        className="share-button"
        url={productUrl}
        subject={`This ${title} Awesome`}
        body={`Check this ${title}.`}
      >
        <EmailIcon size={BUTTON_SIZE} round={true} />
      </EmailShareButton>
      <TwitterShareButton
        className="share-button"
        url={productUrl}
        title={`Check this ${title}.`}
        hashtags={["Avetti", "DemoStore", "B2B", "ecommerce"]}
      >
        <TwitterIcon size={BUTTON_SIZE} round={true} />
      </TwitterShareButton>
      <FacebookShareButton
        className="share-button"
        url={productUrl}
        quote={`Check this ${title}.`}
        hashtags={["Avetti", "DemoStore", "B2B", "ecommerce"]}
      >
        <FacebookIcon size={BUTTON_SIZE} round={true} />
      </FacebookShareButton>
      <LinkedinShareButton
        className="share-button"
        url={productUrl}
        title={`This ${title} Awesome`}
        summary={`Check this ${title}.`}
        source={`Avetti Demo Store`}
      >
        <LinkedinIcon size={BUTTON_SIZE} round={true} />
      </LinkedinShareButton>
      <PinterestShareButton
        className="share-button"
        url={productUrl}
        description={`Check this ${title}.`}
        media={imageUrl}
      >
        <PinterestIcon size={BUTTON_SIZE} round={true} />
      </PinterestShareButton>

      <LineShareButton
        className="share-button"
        url={productUrl}
        title={`This ${title} Awesome`}
        description={`Check this ${title}.`}
      >
        <LineIcon size={BUTTON_SIZE} round={true} />
      </LineShareButton>
      <WhatsappShareButton
        separator={" "}
        className="share-button"
        url={productUrl}
        title={`Check this ${title}.`}
      >
        <WhatsappIcon size={BUTTON_SIZE} round={true} />
      </WhatsappShareButton>
    </div>
  );
};

export default ShareButtons;
