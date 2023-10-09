import ErrorLayout from "@/layouts/ErrorLayout";
import { LinkButton } from "@/styles/buttons";
import { Container } from "@/styles/containers";
import { ErrorTitle } from "@/styles/text";

function NotFoundPage() {
    return (
        <ErrorLayout>
            <Container>
                <ErrorTitle $size={45}>404</ErrorTitle>
                <ErrorTitle $size={30}>This page doesn&apos;t exist</ErrorTitle>
                <LinkButton href="/">Go back</LinkButton>
            </Container>
        </ErrorLayout>
    )
}

export default NotFoundPage;