import ErrorLayout from "@/layouts/ErrorLayout";
import { Container } from "@/styles/containers";
import { ErrorTitle, LinkTo } from "@/styles/text";

function Error({ statusCode }: { statusCode: number }) {
    return (
        <ErrorLayout>
            <Container>
                <ErrorTitle $size={45}>{statusCode}</ErrorTitle>
                <ErrorTitle $size={30}>Unauthorized. Please LOGIN!</ErrorTitle>
                <LinkTo href="/login">Login</LinkTo>
            </Container>
        </ErrorLayout>
    )
}

export default Error;