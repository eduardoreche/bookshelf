import { Link as ReactRouterLink, LinkGetProps } from '@reach/router';
import {
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Spacer,
  Text,
} from '@chakra-ui/react';
import {
  FaBook,
  FaBox,
  FaHome,
  FaPencilAlt,
  FaPrint,
  FaUserCircle,
} from 'react-icons/fa';
import { SearchIcon } from '@chakra-ui/icons';
import { IconType } from 'react-icons/lib';

type HeaderLinkProp = {
  linkTo: string;
  description: string;
  icon: IconType;
};

export const HeaderLink = ({ linkTo, description, icon }: HeaderLinkProp) => {
  const isCurrentLink = ({ isCurrent }: LinkGetProps): any => ({
    style: {
      color: isCurrent ? '#FAF089' : 'white',
    },
  });

  return (
    <Link
      as={ReactRouterLink}
      getProps={isCurrentLink}
      to={linkTo}
      mx={2}
      color='yellow'
    >
      <Icon as={icon} w={6} h={6} mx={2} /> {description}
    </Link>
  );
};

const Header = () => {
  return (
    <Flex p={5} backgroundColor='black' flexDirection='row'>
      <Heading mr={10}>Book Shelf</Heading>

      <Flex
        justifyContent='space-around'
        justifyItems='center'
        alignItems='center'
        fontSize='lg'
      >
        <HeaderLink linkTo='/' description='Home' icon={FaHome} />
        <HeaderLink linkTo='/books' description='Books' icon={FaBook} />
        <HeaderLink
          linkTo='/authors'
          description='Authors'
          icon={FaPencilAlt}
        />
        <HeaderLink
          linkTo='/publishers'
          description='Publishers'
          icon={FaPrint}
        />
        <HeaderLink linkTo='/storages' description='Storages' icon={FaBox} />
      </Flex>

      <Spacer />

      <Flex alignItems='center'>
        <InputGroup mr={5}>
          <InputLeftElement
            pointerEvents='none'
            children={<SearchIcon color='gray.300' />}
          />
          <Input type='text' placeholder='Search' />
        </InputGroup>

        <Text fontSize='xl'>
          <FaUserCircle />
        </Text>
        <Text fontSize='md' ml={3}>
          Eduardo
        </Text>
      </Flex>
    </Flex>
  );
};

export default Header;
