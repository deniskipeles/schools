<script>
    import { Button, Modal, Label, Input, Checkbox } from 'flowbite-svelte'
    let formModal = false;
    let answer = ''
    // export let addAnswer

    import { answers } from "$lib/store/create_question.js";
    const submitAnswer =()=>{
        if (answer.length > 0) {
            answers.update(pre=>{
                pre.push(answer);
                return pre
            })
           formModal = false
           answer = '' 
        }
    }
  </script>
  
  <Button on:click={() => formModal = true}>Add Answer Option</Button>
  <Modal bind:open={formModal} size="xs" autoclose={false}>
    <form class="flex flex-col space-y-6" on:submit|preventDefault={submitAnswer}>
      <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Add The Answer Option Using This Form</h3>
      <Label class="space-y-2">
        <span>Answer</span>
        <Input bind:value={answer} type="text" name="text" placeholder="Write Your Answer..." required />
      </Label>
      <Button type="submit" class="w-full1">Add Your Answer</Button>
      
    </form>
  </Modal>