import Avatar from "antd/lib/avatar/avatar";
import { getInitials } from "../../util.js/helpers";

const ProposalAuthor = ({author, imageurl, ...props} = {}) => {
    return(
        <>
        <Avatar src={imageurl}>{getInitials(author || "")}</Avatar> {author}
        </>
    )
}

export default ProposalAuthor;