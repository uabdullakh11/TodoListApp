import NotFoundPageLayout from "@/layouts/NotFoundPageLayout";
import { Container } from "@/styles/containers";
import { ErrorTitle, LinkTo } from "@/styles/text";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Error = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 5000);
  }, [router]);
  return (
    <NotFoundPageLayout>
      <Container>
        <ErrorTitle $size={45}>404</ErrorTitle>
        <ErrorTitle $size={30}>This page doesn't exist</ErrorTitle>
        <LinkTo href="/">Go back</LinkTo>
      </Container>
    </NotFoundPageLayout>
  );
};

export default Error;
