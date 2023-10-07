import ErrorLayout from "@/layouts/ErrorLayout";
import { Container } from "@/styles/containers";
import { ErrorTitle, LinkTo } from "@/styles/text";

function NotFoundPage() {
    return (
        <ErrorLayout>
            <Container>
                <ErrorTitle $size={45}>404</ErrorTitle>
                <ErrorTitle $size={30}>This page doesn&apos;t exist</ErrorTitle>
                <LinkTo href="/">Go back</LinkTo>
            </Container>
        </ErrorLayout>
    )
}

export default NotFoundPage;