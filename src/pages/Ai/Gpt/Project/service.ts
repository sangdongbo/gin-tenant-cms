import fetchStream from '@/utils/fetchStream';
export { queryBasicRule, queryContactsConfigRule, addContactsConfigRule, queryRule,queryContactsRule, addRule, deleteRule as removeRule, getRule ,updateBasicRule as updateRule, querySelectRule, addContactsFieldsRule, createConfigRule,getConfigRule,getContactsFieldsRule } from '@/pages/workbench/application/Project/service';

const ai_ulr = AI_API + '/app/gpt/evaluator';

export async function queryDocumentsRule(data: { [key: string]: any },onMessage?: any) {
  return fetchStream(`${ai_ulr}/documents`, {
    method: 'POST',
    data,
  }, onMessage);
}
