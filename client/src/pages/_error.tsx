import ErrorLayout from "@/layouts/ErrorLayout";
import { LinkButton } from "@/styles/buttons";
import { Container } from "@/styles/containers";
import { ErrorTitle } from "@/styles/text";

function Error({ statusCode }: { statusCode: number }) {
    return (
        <ErrorLayout>
            <Container>
                <ErrorTitle $size={45}>{statusCode}</ErrorTitle>
                <ErrorTitle $size={30}>Unauthorized. Please LOGIN!</ErrorTitle>
                <LinkButton href="/login">Login</LinkButton>
            </Container>
        </ErrorLayout>
    )
}

export default Error;