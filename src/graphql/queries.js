import { gql } from "@apollo/client";
export const PERSON_ALL_DETAILS_FRAGMENT = gql`
  fragment PersonDetails on Person {
    id
    name
    phone
    address {
      street
      city
    }
  }
`;
export const ALL_PERSONS = gql`
  query {
    allPersons {
      ...PersonDetails
    }
  }

  ${PERSON_ALL_DETAILS_FRAGMENT}
`;

export const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      ...PersonDetails
    }
  }

  ${PERSON_ALL_DETAILS_FRAGMENT}
`;
