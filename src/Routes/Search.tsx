import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { IGetMoviesResult, searchKeyword } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  background: black;
  position: relative;
  top: 100px;
  display: flex;
  display: grid;
  gap: 5px;
  /* grid-template-columns: repeat(3, 1fr); */
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center;
  height: 180px;
  font-size: 66px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

function Search() {
  const location = useLocation();
  const history = useHistory();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["search", "searchKeyword"],
    () => searchKeyword(keyword)
  );

  const onBoxClicked = (movieId: number) => {
    history.push(`/movies/${movieId}`);
  };

  return (
    <Wrapper>
      <Row>
        {data?.results.map((movie) => (
          <Box
            key={movie.id}
            bgPhoto={makeImagePath(movie?.backdrop_path, "w500")}
            whileHover="hover"
            initial="normal"
            variants={boxVariants}
            transition={{ type: "tween" }}
            layoutId={movie.id + ""}
            onClick={() => onBoxClicked(movie.id)}
          >
            <Info variants={infoVariants}>
              <h4>{movie.title}</h4>
            </Info>
          </Box>
        ))}
      </Row>
    </Wrapper>
  );
}

export default Search;
