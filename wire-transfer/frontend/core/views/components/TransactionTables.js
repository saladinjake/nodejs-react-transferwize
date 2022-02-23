import React, {useState, useEffect} from "react";
import { useTable, usePagination } from "react-table";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  IconButton,
  Text,
  Tooltip,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box
} from "@chakra-ui/react";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon
} from "@chakra-ui/icons";
import PropTypes from "prop-types";
import { connect } from "react-redux";


import { getUser } from "../../services/auth.services"

function CustomTable({ columns, data,  auth: {user  } }) {

  let isLoggedIn = false;
  const [id, setId] = useState("")
  const [email, setEmail] = useState("")
  const [firstName, setFirstName ] = useState("")
  const [lastName, setLastName] = useState("")
  const [isAuthenticated,setIsAuthenticated] = useState(false)
  const [token,setToken] = useState("")
  useEffect(async()=>{
      if(typeof window!=="undefined"){
         
        if(window.localStorage && window.localStorage.getItem("user")){
          console.log(window.localStorage.getItem("user"))
          user = JSON.parse(window.localStorage.getItem("user"))
          setId(user.id) // no longer id rather should uniquely identify user from the glance of the app
          setEmail(user.email)
          setFirstName(user.firstName)
          setLastName(user.lastName)
          setIsAuthenticated(user.isAuthenticated)
          setToken(user.token)
          if (user.token && user.isAuthenticated) {
             isLoggedIn = true;
          }
        }else{
          await logOut()
          setTimeout(()=>{window.location.href="/login"},2000)
        }
      }
  },[user])

  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }
    },
    usePagination
  );

  data.forEach( async (transaction) =>{
    let givenTradingAmount =null;
    if(transaction.type ==="debit"){
       transaction.senderid = transaction.senderemail;
       if(transaction.senderid== email ){

         
         const descriptionMessage = `
         Dear ${firstName+ " "+ lastName}, 
         Your wallet account was debited 
         by ${transaction.tocurrency}${transaction.exchangeamount}
         an equivalent of ${transaction.formcurrency}${transaction.amount}
         ON THIS DAY ${transaction.createdon}. 
         A payment was paid to ${transaction.receipientid}.`;
         transaction.information = descriptionMessage;

       }else{
         let date = new Date(transaction.createdOn);
         date = date.getFullYear()+ "-"+ date.getMonth()+ "-"+ date.getDay()
                  const descriptionMessage = `
         Dear ${firstName+ " "+ lastName}, 
         Your wallet account was credit 
         with ${transaction.tocurrency}${transaction.exchangeamount}
         an equivalent of ${transaction.formcurrency}${transaction.amount}
         ON THIS DAY ${date}. 
         A payment was made from to ${transaction.senderemail}.`;
         transaction.information = descriptionMessage;
       }
       transaction["cash_in_flow_debit"] = `- ${transaction.formcurrency}` + transaction.amount
    }else{

       //if transactiontype is credit by user
          transaction.senderid = transaction.senderemail;
       if(transaction.senderid== email ){

         
         const descriptionMessage = `
         
         This payment was paid to ${transaction.receipientid}.`;
         transaction.information = descriptionMessage;

       }else{
        const descriptionMessage = ` 
         This payment was made from to ${transaction.senderemail}.`;
         transaction.information = descriptionMessage;
       }


      transaction["cash_in_flow_credit"] =`+ ${transaction.tocurrency} ` + transaction.exchangeamount
    }
  })

  
  return (
    <>
       <Box overflowX="auto">
      <Table bg="#fff"  {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <Th key={Math.random(20)*10 + index} {...column.getHeaderProps({
                  style: { minWidth: column.minWidth, width: column.width },
                })}>{column.render("Header")}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell,index) => {
                  return (
                    <Td key={Math.random(20)*10 + index} width="100px" {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      </Box>

      <Flex justifyContent="space-between" m={4} alignItems="center">
        <Flex>
          <Tooltip label="First Page">
            <IconButton
              onClick={() => gotoPage(0)}
              isDisabled={!canPreviousPage}
              icon={<ArrowLeftIcon h={3} w={3} />}
              mr={4}
            />
          </Tooltip>
          <Tooltip label="Previous Page">
            <IconButton
              onClick={previousPage}
              isDisabled={!canPreviousPage}
              icon={<ChevronLeftIcon h={6} w={6} />}
            />
          </Tooltip>
        </Flex>

        <Flex alignItems="center">
          <Text flexShrink="0" mr={8}>
            Page{" "}
            <Text fontWeight="bold" as="span">
              {pageIndex + 1}
            </Text>{" "}
            of{" "}
            <Text fontWeight="bold" as="span">
              {pageOptions.length}
            </Text>
          </Text>
          <Text flexShrink="0">Go to page:</Text>{" "}
          <NumberInput
            ml={2}
            mr={8}
            w={28}
            min={1}
            max={pageOptions.length}
            onChange={(value) => {
              const page = value ? value - 1 : 0;
              gotoPage(page);
            }}
            defaultValue={pageIndex + 1}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Select
            w={32}
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
        </Flex>

        <Flex>
          <Tooltip label="Next Page">
            <IconButton
              onClick={nextPage}
              isDisabled={!canNextPage}
              icon={<ChevronRightIcon h={6} w={6} />}
            />
          </Tooltip>
          <Tooltip label="Last Page">
            <IconButton
              onClick={() => gotoPage(pageCount - 1)}
              isDisabled={!canNextPage}
              icon={<ArrowRightIcon h={3} w={3} />}
              ml={4}
            />
          </Tooltip>
        </Flex>
      </Flex>

    </>
  );
}


CustomTable.propTypes = {
  auth: PropTypes.object.isRequired,
};



const mapStateToProps = (state) => ({
  auth: state.auth
});

const  CustomTableSwaggedUp = connect(mapStateToProps, {
  
})(CustomTable);

function TableApplication({data}) {
  const columns = React.useMemo(
    () => [
      
      {
        Header: "Transaction History",
        columns: [
          {
            Header: "senderid",
            accessor: "senderid",
            maxWidth: 100,
            minWidth: 100,
             width: 150,
          },
          {
            Header: "receipientid",
            accessor: "receipientid",
            maxWidth: 100,
            minWidth: 100,
             width: 150,
          },
          {
            Header: "Notification",
            maxWidth: 600,
            minWidth: 400,
             width: 550,
            accessor: "information"
          },
          {
            Header: "Debit Ledger",
            accessor: "cash_in_flow_debit",
            maxWidth: 200,
            minWidth: 200,
             width: 250,
             background:"darkblue",
             color:"#fff",
          },
          {
            Header: "Credit Ledger",
            accessor: "cash_in_flow_credit",
            maxWidth: 200,
            minWidth: 200,
             width: 250,
             background:"green",
             color:"#fff",

          },
          {
            Header: "Equivalent",
            accessor: "exchangeamount",
            maxWidth: 200,
            minWidth: 200,
             width: 250,
          },
          {
            Header: "from currency",
            accessor: "formcurrency",
            maxWidth: 100,
            minWidth: 100,
             width: 150,
          },
          {
            Header: "to currency",
            accessor: "tocurrency",
            maxWidth: 100,
            minWidth: 100,
             width: 150,
          },
          {
            Header: "rate",
            accessor: "rate",
            maxWidth: 100,
            minWidth: 100,
             width: 150,
          },
          {
            Header: "Transaction Type",
            accessor: "type",
            maxWidth: 100,
            minWidth: 100,
             width: 150,
          },
          
          
        ]
      }
    ],
    []
  );

  //const data = React.useMemo(() => data, []);

  return <CustomTableSwaggedUp columns={columns} data={data} />;
}

export default TableApplication;
