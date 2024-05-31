"use client";
import React, { useEffect, useState } from "react";
import ChannelCard from "./_components/ChannelCard";
import useFaceBookLogin from "@/hooks/useFacebookLogin";
import useFacebookStore from "@/state-management/facebook/metaStore";
import { useSaveInstaUser, useSavePlatForm } from "@/hooks/instaFetch";
import useFaceBookPages, {
  PageDataInterface,
} from "@/state-management/facebook/pageStore";
import Modal from "@/components/Modal";

import FaceBookPageList from "./_components/FaceBookPageList";

const Page = () => {
  const pageId = useFaceBookPages((s) => s.selectedPageId);

  const { loginWithFacebook, facebookLoginDialog } = useFaceBookLogin();
  const { accessToken, platform, userId } = useFacebookStore();
  const { setPages, pages } = useFaceBookPages();
  const { mutate } = useSavePlatForm();
  const [openModel, setModelOpen] = useState(false);

  useEffect(() => {
    if (pageId) {
      const newPage = pages.filter((item: PageDataInterface) => {
        return item.id === pageId;
      });

      mutate({
        accessToken: newPage[0].access_token,
        userId: newPage[0].id,
        platform: "facebook",
        name: newPage[0].name,
      });
    }
  }, [pageId]);

  const socialMedia = [
    {
      label: "Facebook",
      icon: "/assets/images/facebook.png",
      description: "Page or Group",
      onLogin: loginWithFacebook,
      // onLogin: () => facebookLoginDialog("facebook"),
    },
    {
      label: "Instagram",
      icon: "/assets/images/instagram.png",
      description: "Business or Creator accounts",
      onLogin: () => facebookLoginDialog("instagram"),
    },
    {
      label: "YouTube",
      icon: "/assets/images/youtube.png",
      description: "Channel",
      onLogin: () => {},
    },
    {
      label: "TikTok",
      icon: "/assets/images/tiktok.png",
      description: "Business or Creator accounts",
      onLogin: loginWithFacebook,
    },
  ];

  const fetchPages = async (acess: string, id: string) => {
    const res = await fetch(
      `https://graph.facebook.com/v20.0/${id}/accounts?access_token=${acess}`
    );

    //graph.facebook.com/v17.0/106033669270099?fields=instagram_business_account&access_token=

    // https:
    const data = await res.json();

    setPages(data.data);
  };

  useEffect(() => {
    if (accessToken && platform == "instagram") {
      mutate({
        accessToken: accessToken,
        userId: userId,
        platform: platform,
      });
    }
    if (accessToken && platform == "facebook") {
      fetchPages(accessToken, userId);
    }
  }, [accessToken, platform]);

  useEffect(() => {
    if (pages) {
      setModelOpen(true);
    }
  }, [pages]);

  return (
    <>
      <Modal
        title="Connect to the facebook Page"
        onClose={() => setModelOpen(false)}
        open={openModel}
        tone="danger"
        size="large"
        actions={{
          cancel: {
            label: "Cancel",
            action: () => setModelOpen(false),
          },
        }}
      >
        <FaceBookPageList closeModal={() => setModelOpen(false)} data={pages} />
      </Modal>
      <section className="pt-3 ml-6 flex flex-col min-h-full gap-y-6 border-r ">
        {socialMedia.map((item) => {
          return (
            <>
              <ChannelCard key={item.label} {...item} />
            </>
          );
        })}
      </section>
    </>
  );
};

export default Page;
