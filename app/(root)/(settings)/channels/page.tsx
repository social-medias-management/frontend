"use client";
import Modal from "@/components/shared/Modal";
import { useSavePlatFormfacebook } from "@/hooks/facebookapi";
import { useGetUserPlatForm, useSavePlatForm } from "@/hooks/instaFetch";
import { SheduleInterface } from "@/hooks/platform";
import useFaceBookLogin from "@/hooks/useFacebookLogin";
import apiClients from "@/services/http-service";
import { useLoginWithGoogle } from "@/services/youtube-api";
import useFacebookStore from "@/state-management/facebook/metaStore";
import useFaceBookPages, {
  PageDataInterface,
} from "@/state-management/facebook/pageStore";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ChannelCard from "./_components/ChannelCard";
import FaceBookPageList from "./_components/FaceBookPageList";
import { toast } from "react-toastify";
const Page = () => {
  const { selectedPageId: pageId, setSelectedPageID } = useFaceBookPages();

  const { loginWithFacebook, facebookLoginDialog } = useFaceBookLogin();
  const { accessToken, platform, userId } = useFacebookStore();
  const { setPages, pages } = useFaceBookPages();
  const { mutate, isSuccess } = useSavePlatForm();
  const [openModel, setModelOpen] = useState(false);
  const { mutate: saveFacebookToken, isSuccess: isFacebookTokenSaveSuccess } =
    useSavePlatFormfacebook();
  const { login: loginWithGoogle } = useLoginWithGoogle();

  const httpService = new apiClients<SheduleInterface>("/tiktok/qauth");

  const { mutate: tiktokMutate } = useMutation({
    mutationFn: httpService.create,
  });

  const { refetch } = useGetUserPlatForm();

  const loginWithTiktok = () => {
    tiktokMutate({});
  };

  useEffect(() => {
    if (pageId) {
      const newPage = pages.filter((item: PageDataInterface) => {
        return item.id === pageId;
      });

      saveFacebookToken({
        accessToken: newPage[0].access_token,
        userId: newPage[0].id,
        platform: "facebook",
        name: newPage[0].name,
      });
      setSelectedPageID("");
    }
  }, [pageId, pages, saveFacebookToken]);

  const socialMedia = [
    {
      label: "Facebook",
      icon: "/assets/images/facebook.png",
      description: "Page or Group",
      onLogin: loginWithFacebook,
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
      onLogin: loginWithGoogle,
    },
    {
      label: "TikTok",
      icon: "/assets/images/tiktok.png",
      description: "Business or Creator accounts",
      onLogin: loginWithTiktok,
    },
  ];

  const fetchPages = async (acess: string, id: string) => {
    const res = await fetch(
      `https://graph.facebook.com/v20.0/${id}/accounts?access_token=${acess}`
    );
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

  useEffect(() => {
    if (isSuccess || isFacebookTokenSaveSuccess) {
      refetch();
    }
  }, [isSuccess, isFacebookTokenSaveSuccess]);

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
