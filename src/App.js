import algoliasearch from 'algoliasearch/lite';
import React from 'react';
import {
  InstantSearch,
  Index,
  Hits,
  Configure,
  SearchBox,
  Pagination,
  Highlight,
  HierarchicalMenu,
} from 'react-instantsearch-dom';
import './App.css';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const searchClient = algoliasearch(
  'CSDBX0SZMQ',
  '4bfa904cde10c4036e72bb5ad6a698d4'
);

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

export default function App() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="ais-InstantSearch">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tincidunt
        tellus lorem, sed porttitor neque gravida vitae.
      </p>
      <InstantSearch indexName="crawler_tg_content" searchClient={searchClient}>
        <SearchBox
          autoFocus
          translations={{
            submitTitle: 'Verstuur je zoekopdracht',
            resetTitle: 'Maak je zoekopdracht leeg',
            placeholder: 'Zoek in artikelen en koopwijzers',
          }}
        />
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Artikelen" />
            <Tab label="Koopwijzer" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Index indexName="crawler_tg_content">
            <Box sx={{ flexGrow: 2 }}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={3} lg={2} xl={1}>
                  <Card
                    sx={{
                      width: {
                        xs: 1.0, // 100%
                        sm: 1.0,
                        md: 0.95,
                      },
                      borderRadius: 2,
                      bgcolor: '#f2f2f2',
                      border: 'none',
                    }}
                    variant="outlined"
                  >
                    <CardContent>
                      <Typography variant="h5">Categorieën</Typography>
                      <HierarchicalMenu
                        attributes={['categories.lvl0', 'categories.lvl1']}
                      />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={10} xl={11}>
                  <Configure hitsPerPage={8} />
                  <Hits hitComponent={Hit} />
                  <Pagination />
                </Grid>
              </Grid>
            </Box>
          </Index>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Index indexName="crawler_tg_koopwijzer">
            <div className="left-panel">
              <h2>Categorieën</h2>
              <HierarchicalMenu
                attributes={['categories.lvl0', 'categories.lvl1']}
              />
            </div>
            <div className="right-panel">
              <Hits hitComponent={Hit} />
              <Pagination />
            </div>
          </Index>
        </TabPanel>
      </InstantSearch>
    </div>
  );
}

function Hit(props) {
  return (
    <Card
      sx={{
        width: {
          xs: 1.0, // 100%
          sm: 250,
          md: 300,
        },
      }}
    >
      <CardMedia
        component="img"
        height="240"
        image={props.hit.image}
        alt={props.hit.name}
      />
      <CardContent>
        <div className="hit-title">
          <Highlight attribute="title" hit={props.hit} />
        </div>
        <div className="hit-description">
          <Highlight attribute="text" hit={props.hit} />
        </div>
        <div className="hit-pagetype">{props.hit.pageType}</div>
        <div className="hit-pagepublicationdate">
          {props.hit.pagePublicationDate}
        </div>
      </CardContent>
      <CardActions>
        <Button size="small">Lees meer</Button>
      </CardActions>
    </Card>
  );
}
